#####################################################################################################
#SETUP
#####################################################################################################

import os
from psaw import PushshiftAPI
import pandas as pd
import numpy as np
import datetime
import networkx as nx
import matplotlib.pyplot as plt
from tqdm import tqdm
import datetime
import pickle
from wordcloud import WordCloud
import nltk
import re
from PIL import Image
from sentiment import *

nltk.download('punkt')
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk import word_tokenize
SW = stopwords.words("english")

DATA_FOLDER = 'reddit_data'
RAW_DATA_FILENAME = os.path.join(DATA_FOLDER, 'HP_raw_data.csv')
PROCESSED_FILENAME = os.path.join(DATA_FOLDER, 'HP_processed_data.csv')
AUTHOR_SUBREDDIT_FILENAME = os.path.join(DATA_FOLDER, 'HP_author_subreddit_data.csv')
AUTHOR_POSTS_FILENAME = os.path.join(DATA_FOLDER, 'HP_chosen_author_posts_data.csv')
SUBREDDIT_COMMENTS_RAW = os.path.join(DATA_FOLDER, 'HP_comments_raw.csv')
SUBREDDIT_COMMENTS_PROCESSED = os.path.join(DATA_FOLDER, 'HP_comments_processed.csv')
SUBREDDIT_INTERACTIONS = os.path.join(DATA_FOLDER, 'HP_subreddit_interactions.pkl')


if not os.path.isdir(DATA_FOLDER):
    os.mkdir(DATA_FOLDER)

api = PushshiftAPI()

#####################################################################################################
#GETTING DATA
#####################################################################################################

def get_submissions(overwrite = False, date1 = None, date2 = None):
    """
    Collect data from the subreddit r/harrypotter between date1 and date2
    """   

    if os.path.exists(RAW_DATA_FILENAME) and not overwrite:
        print('Loading existing raw data')
        df_submissions = pd.read_csv(RAW_DATA_FILENAME)
        print('Loaded raw data')
    else:
        my_subreddit = "harrypotter"
        date1 = date1 if date1 else int(datetime.datetime(2021, 1, 1).timestamp())
        date2 = date2 if date2 else int(datetime.datetime(2021, 3, 25).timestamp())
        #query = "Gryffindor"

        date_range = pd.date_range(start=datetime.datetime.utcfromtimestamp(date1), 
        end=datetime.datetime.utcfromtimestamp(date2), periods=None, freq="D")

        results = []

        for i in tqdm(range(len(date_range)-1)):
            gen = api.search_submissions(subreddit = my_subreddit,
                                    after = int(date_range[i].timestamp()),
                                    before = int(date_range[i+1].timestamp()))
            results = results + list(gen)

        df_submissions = pd.DataFrame([(p.d_["title"], 
                            p.d_["id"], 
                            p.d_["score"], 
                            p.d_["created_utc"],
                            datetime.datetime.utcfromtimestamp(p.d_["created_utc"]).strftime("%Y-%m-%d"),
                            p.d_["author"],
                            p.d_["num_comments"],
                            p.d_["author_flair_css_class"]) 
                            for p in results], 
                            columns = ["title", "id", "score", "created_utc", "creation_date", "author", "num_comments", 
                            "house_id"])

        # remove entries with no house
        df_submissions = df_submissions.dropna().reset_index(drop=True)

        # Save raw data to csv, so we don't have to fetch it again
        df_submissions.to_csv(RAW_DATA_FILENAME, index=False)
     
    # print(df_submissions)
    return df_submissions

def preprocess_submissions(df_submissions=None, overwrite = False):
    """
    Adds the users house ti the data frame
    """
    house_id = 'house_id'
    if os.path.exists(PROCESSED_FILENAME) and not overwrite:
        df_submissions = pd.read_csv(PROCESSED_FILENAME)
    else:
        assert isinstance(df_submissions, pd.DataFrame), "Please specify a submissions dataframe"
        # Preprocess
        df_submissions["house"] = df_submissions[house_id].apply(lambda x: 'Gryffindor' if 'GR' in x
                                                                    else 'Slytherin' if 'SL' in x
                                                                    else 'Hufflepuff' if 'HF' in x
                                                                    else 'Ravenclaw' if 'RV' in x
                                                                    else None
        )

        # Drop nodes with non of the four houses
        df_submissions = df_submissions.dropna(subset=['house']).reset_index(drop=True, inplace=False)

        df_submissions.to_csv(PROCESSED_FILENAME, index=False)
    
    return df_submissions

#####################################################################################################
#ACTIVITY OF TOP USERS
#####################################################################################################
def get_author_subreddits(authors, date1=None, date2 = None):
    date1 = date1 if date1 else int(datetime.datetime(2021, 1, 1).timestamp())
    date2 = date2 if date2 else int(datetime.datetime(2021, 3, 25).timestamp())

    

    date_range = pd.date_range(start=datetime.datetime.utcfromtimestamp(date1), 
        end=datetime.datetime.utcfromtimestamp(date2), periods=None, freq="D")

    results = []

    for i in tqdm(range(len(date_range)-1)):
        gen = api.search_submissions(author=authors,
                                after = int(date_range[i].timestamp()),
                                before = int(date_range[i+1].timestamp()),
                                filter=['author', 'subreddit', 'subreddit_id'])
        results = results + list(gen)

    author_subreddits = pd.DataFrame([(p.d_["author"], 
                        p.d_["subreddit"], 
                        p.d_["subreddit_id"]) 
                        for p in results], 
                        columns = ["author", "subreddit", 'subreddit_id'])
    
    get_house = lambda x: df_submissions[df_submissions.author == x].house.iloc[0] if x in list(df_submissions.author) else None
    author_subreddits["house"] = author_subreddits.author.apply(get_house)
    
    return author_subreddits


def get_top_author_subreddits(df_submissions, X=100, overwrite = False, date1 = None, date2 = None):
    """
    Gets the subreddits for the top X users in df_submissions
    """
    if os.path.exists(AUTHOR_SUBREDDIT_FILENAME) and not overwrite:
        author_subreddits = pd.read_csv(AUTHOR_SUBREDDIT_FILENAME)
    else:
        assert isinstance(df_submissions, pd.DataFrame), "Please specify a submissions dataframe"
        # Looking at top X authors from r/harrypotter to not get time out from Pushshift
        # X=100
        submissions_by_author = df_submissions.groupby('author').sum()
        top_X_submissions = submissions_by_author.sort_values(by='num_comments', ascending=False).head(X).reset_index()
        # print(f'{len(top_X_submissions)} authors')
        # top_X_submissions

        authors = top_X_submissions['author']
    
        author_subreddits = get_author_subreddits(authors, date1=date1, date2 = date2)
        author_subreddits.to_csv(AUTHOR_SUBREDDIT_FILENAME, index=False)
    
    return author_subreddits

def chose_users(author_subreddits, limit = 20):
    """
    Returns a list of users with activity on more subreddits than the limit
    """
    # Unique subreddits for each selected r/harrypotter author
    unique_sub_reddits = author_subreddits.groupby('author').nunique().sort_values(by='subreddit', ascending=False)
    # unique_sub_reddits

    # limit = 20 # Different subreddits
    chosen_users = unique_sub_reddits[unique_sub_reddits['subreddit'] >= limit]
    # chosen_users

    chosen_users = chosen_users.index
    return list(chosen_users)

def get_author_posts(author, date1=None, date2=None):
    """
    Returns activity on other subreddits for the user
    """
    date1 = date1 if date1 else int(datetime.datetime(2021, 1, 1).timestamp())
    date2 = date2 if date2 else int(datetime.datetime(2021, 3, 25).timestamp())

    # date_range = pd.date_range(start=datetime.datetime.utcfromtimestamp(date1), 
    #     end=datetime.datetime.utcfromtimestamp(date2), periods=None, freq="D")

    submission_results = []
    comment_results = []

    submissions = api.search_submissions(author=author,
                                after = date1,
                                before = date2,
                                filter=['author', 'subreddit', 'title', 'selftext', 'id', 'created_utc'])
    submission_results = list(submissions)

    comments = api.search_comments(author=author,
                                after = date1,
                                before = date2,
                                filter=['author', 'subreddit', 'body', 'id', 'link_id', 'parent_id', 'created_utc'])

    comment_results = list(comments)

    for s in submission_results:
        s.d_['link_id'] = ''
        s.d_['parent_id'] = ''
        s.d_['text'] = s.d_['title'] + s.d_['selftext']

    for c in comment_results:
        c.d_['text'] = c.d_['body']

    author_posts = pd.DataFrame([(
                        p.d_["id"],
                        p.d_["author"], 
                        p.d_["subreddit"], 
                        p.d_["text"],
                        p.d_["link_id"],
                        p.d_["parent_id"],
                        p.d_["created_utc"]) 
                        for p in (submission_results + comment_results)], 
                        columns = ["id", "author", 'subreddit', 'text', 'link_id', 'parent_id', 'created_utc'])
    return author_posts

def get_activity_of_users(chosen_users=None, overwrite = False, date1=None, date2=None):
    if os.path.exists(AUTHOR_POSTS_FILENAME) and not overwrite:
        author_posts = pd.read_csv(AUTHOR_POSTS_FILENAME)
    else:
        assert isinstance(chosen_users, list), "No users were specified"
        author_posts = get_author_posts(chosen_users[0], date1=date1, date2=date2)
        for user in tqdm(chosen_users[1:]):
            posts = get_author_posts(user)
            author_posts = pd.concat([author_posts, posts], ignore_index=True)
        author_posts.to_csv(AUTHOR_POSTS_FILENAME, index=False)
    
    return author_posts

def get_author_tokens(author_activity):
    sub_tokens = []
    for text in tqdm(author_activity["text"]):
        # remove urls
        text = [w for w in text.split(" ") if not re.search(r"[/ \\]", w)]
        #get tokens
        tokens = [token.lower() for token in word_tokenize(" ".join(text)) 
                if token.lower() not in SW
                and token.isalpha()]
        sub_tokens.append(tokens)
        
    author_activity["tokens"] = sub_tokens

    def concat(series):
        document = []
        for tokens in series:
            document.extend(tokens)
        
        return document

    author_text_docs = author_activity.groupby('author')['tokens'].apply(lambda x: concat(x))
    return author_text_docs

def create_user_wordclouds(users, TF_IDF, df_submissions, height):
    """
    Creates wordclouds from the users given and a dictionary with their TF-IDF score
    """
    title_color = {
    'Gryffindor': 'red',
    'Slytherin': 'green',
    'Hufflepuff': 'yellow',
    'Ravenclaw': 'blue'
    }
    shield_mask = np.array(Image.open('wordcloud_contours/shield_contour.jpg'))
    
    width = int(len(users)/height)
    fig, ax = plt.subplots(height,width, dpi = 300, figsize = (20,30))
    titles = users
    font = {'family': 'serif',
            'weight': 'normal',
            'size': 20,
            }

    i = 0    
    for col in tqdm(range(width)):
        for row in tqdm(range(height)):
            user = users[i]
            user_house = df_submissions[df_submissions['author'] == user]['house'].iloc[0]
            user_color = title_color[user_house]
            wordcloud = WordCloud(width = 400*width,
                        height = 400*height,
                        max_words=100,
                        background_color ='white',
                        mask=shield_mask,
                        contour_width=3,
                        contour_color=user_color).generate_from_frequencies(dict(TF_IDF[i]))
            ax[row,col].imshow(wordcloud, interpolation='bilinear')
            ax[row,col].set_axis_off()
            ax[row,col].set_title(titles[i], fontdict = font)
            i += 1
        

    plt.show()

#####################################################################################################
#INTERACTIONS ON R/HARRYPOTTER
#####################################################################################################

def get_comments(df_submissions=None, overwrite = False, date1 = None, date2 = None):
    """
    Gets comments from the submissions in df_submissions 
    """
    if os.path.exists(SUBREDDIT_COMMENTS_RAW) and not overwrite:
        print('Loading existing raw data')
        df_comments = pd.read_csv(SUBREDDIT_COMMENTS_RAW)
        print('Loaded raw data')
    else:
        assert isinstance(df_submissions, pd.DataFrame), "Please specify a submissions dataframe"
        # get comments on harrypotter subreddit
        api = PushshiftAPI()
        my_subreddit = "harrypotter"
        date1 = int(datetime.datetime(2021, 1, 1).timestamp())
        date2 = int(datetime.datetime(2021, 3, 25).timestamp())


        # get comments in a for loop
        comments = []
        sub_ids = list(df_submissions[df_submissions["num_comments"] > 0]["id"])
        N = 50 #split api call in N bits
        step = len(sub_ids)/N
        for i in tqdm(range(N)):
            ids = sub_ids[int(round(i*step)):int(round((i+1)*step))]
            gen_comments = api.search_comments(subreddit = my_subreddit,
                                            after = date1,
                                            before = date2,
                                            link_id = ids,
                                            filter=['author', 'score', 'body', 'id', 'link_id', 'parent_id', 'created_utc', 'author_flair_css_class'])
            comments.extend(list(gen_comments))

        # save csv
        df_comments = pd.DataFrame([(p.d_["id"],
                                p.d_["link_id"],
                                p.d_["score"],
                                p.d_["created_utc"],
                                datetime.datetime.utcfromtimestamp(p.d_["created_utc"]).strftime("%Y-%m-%d"),
                                p.d_["author"],
                                p.d_["parent_id"],
                                p.d_["author_flair_css_class"],
                                p.d_["body"]) for p in comments], 
                                columns = [ "id", "submission_id", "score", "created_utc", "creation_date", "author", "parent_id", "house_id", "text"])
        df_comments.to_csv(SUBREDDIT_COMMENTS_RAW, index=False)
    
    return df_comments

def preprocess_comments(df_comments=None, df_submissions = None, overwrite = False):
    house_id = 'house_id'
    if os.path.exists(SUBREDDIT_COMMENTS_PROCESSED) and not overwrite:
        df_comments = pd.read_csv(SUBREDDIT_COMMENTS_PROCESSED)
    else:
        assert isinstance(df_comments, pd.DataFrame), "Please specify a comments dataframe"
        assert isinstance(df_submissions, pd.DataFrame), "Please specify a submissions dataframe"
        # Preprocess
        df_comments = df_comments.dropna(subset=[house_id]).reset_index(drop=True, inplace=False)
        df_comments["house"] = df_comments[house_id].apply(lambda x: 'Gryffindor' if 'GR' in x
                                                                    else 'Slytherin' if 'SL' in x
                                                                    else 'Hufflepuff' if 'HF' in x
                                                                    else 'Ravenclaw' if 'RV' in x
                                                                    else None
        )

        # Drop nodes with non of the four houses
        df_comments = df_comments.dropna(subset=['house']).reset_index(drop=True, inplace=False)

        # dictionaries
        comment_authors = dict(zip(df_comments["id"], df_comments["author"]))
        parent = dict(zip(df_comments["id"], df_comments["parent_id"]))
        submissions_authors = dict(zip(df_submissions["id"], df_submissions["author"]))
        author_house = dict(zip(df_comments["author"], df_comments["house"]))

        # function for getting author of parent id
        def get_parent_author(comment_id):
            parent_id = parent[comment_id]
            t_parent_id = parent_id[:3]
            parent_id = parent_id[3:]
            
            try:
                if t_parent_id == "t1_":
                    return comment_authors[parent_id]# if parent_id in comment_authors.keys else None
                elif t_parent_id == "t3_":
                    return submissions_authors[parent_id]
                else:
                    return -1
            except KeyError:
                return -1
            
        # create parent_author column in comments dataframe
        df_comments["parent_author"] = list(map(get_parent_author, df_comments["id"])) #get_parent_author(comments.id)
        
        # add the house of the parent author to a column
        df_comments["parent_house"] = [author_house[parent_author] if parent_author in author_house.keys() else "None" for parent_author in df_comments["parent_author"]]

        # remove unwanted authors
        df_comments.parent_author = df_comments.parent_author.replace(-1, "None")
        df_comments = df_comments[(df_comments.author != "[deleted]") & (df_comments.parent_author != "[deleted]")]# remove deleted users


        df_comments.to_csv(SUBREDDIT_COMMENTS_PROCESSED, index=False)
    return df_comments

def create_interactions(df_comments=None, overwrite = False):
    if os.path.exists(SUBREDDIT_INTERACTIONS) and not overwrite:
        with open(SUBREDDIT_INTERACTIONS, "rb") as file:
            interactions = pickle.load(file)
    else:
        assert isinstance(df_comments, pd.DataFrame), "Please specify a comments dataframe"
        # remove submissions, as they do not have a receiving house
        interactions = df_comments[df_comments.parent_house != "None"].reset_index(drop=True, inplace=False)
        interactions = interactions[["house", "parent_house", "text"]]

        # group interactions for each vombination of receiving and sending house
        interactions = interactions.groupby(["house", "parent_house"]).agg(list)
        interactions = interactions.reset_index()
        interactions["number_of_interactions"] = [len(t) for t in interactions.text]

        # get text tokens
        sub_tokens = []
        for text in interactions.text:
            tokens = [token.lower() for token in word_tokenize(" ".join(text)) 
                    if token.lower() not in SW
                    and token.isalpha()]
            sub_tokens.append(tokens)

        interactions["tokens"] = sub_tokens

        # add TF-IDF scores
        tf, tf_idf = TF_IDF(interactions.tokens, interactions.tokens)
        interactions["TF"] = tf
        interactions["TF_IDF"] = tf_idf

        # add sentiment scores
        interactions["vader"] = [vader_sentiment(t) for t in interactions.text]
        interactions["happiness"] = [happiness(t) for t in interactions.tokens]
        interactions["emotion_score"] = [emotion_score(t) for t in interactions.tokens]

        with open(SUBREDDIT_INTERACTIONS, "wb") as file:
            pickle.dump(interactions, file)

    return interactions

def interaction_wordclouds(interactions, freq_type = "TF_IDF", save_as = None):
    """
    Creates a wordcloud for each type of interaction based on the freq_type given as a column name of the interactions data frame
    """
    houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
    shield_mask = np.array(Image.open('wordcloud_contours/shield_contour.jpg'))


    width, height = 4, 4
    fig, ax = plt.subplots(height,width, dpi = 300, figsize = (20,30))
    # titles = [f"{h1} to {h2}" for h1 in houses for h2 in houses]
    font = {'family': 'serif',
            'weight': 'normal',
            'size': 20,
            }

    i = 0    
    for col in tqdm(range(width)):
        for row in tqdm(range(height)):
            wordcloud = WordCloud(width = 400*width,
                        height = 400*height,
                        max_words=100,
                        background_color ='white',
                        mask=shield_mask,
                        contour_width=3,
                        contour_color="blue").generate_from_frequencies(dict(interactions[freq_type][i]))
            ax[row,col].imshow(wordcloud, interpolation='bilinear')
            ax[row,col].set_axis_off()
            ax[row,col].set_title(f"{interactions.house[i]} to {interactions.parent_house[i]}", fontdict = font, backgroundcolor='white')
            i += 1
    if save_as:    
        plt.savefig(save_as)
    plt.show()


def UserInteractions():
    df = pd.read_csv('reddit_data/HP_comments_processed.csv')
    df = df[df['parent_house'] != 'None']
    house_dict = {name: house for name, house in df[['author', 'house']].values}
    house_dict.update({name: house for name, house in df[['parent_author', 'parent_house']].values})
    H = df.groupby(['author', 'parent_author']).agg({'text':'sum'}).reset_index()
    H['sentiment'] = H.text.apply(lambda x: vader_sentiment(x))

    return H, house_dict


def CreateUserInteractionNetwork(user_interactions, house_dict):
    G = nx.DiGraph()
    for (source, target, _, sentiment) in user_interactions.to_records(index=False).tolist():
        G.add_edge(source, target, weight = (sentiment + 1)/2)

    for node, data in G.nodes(data = True):
        data['group'] = house_dict[node]

    partition = [set([node for node, data in G.nodes(data = True) if data['group'] == house]) for house in set(house_dict.values())]

    return G, partition


def plot_degree_distribution(G, save_data = False):
    fig, ax = plt.subplots(dpi = 100)
    names_, degree = zip(*G.degree())

    nbins = 30
    bins = np.logspace(1, np.log(max(degree)), nbins)
    hist, edges = np.histogram(degree, bins = bins, density = True )
    x = (edges[1:] + edges[:-1])/2.
    # remove 0 entries
    xx, yy = zip(*[(i,j) for (i,j) in zip(x, hist) if j > 0])
    ax.plot(xx,yy, marker = '.')
    ax.grid(linestyle = '--')
    ax.set_xscale('log')
    ax.set_yscale('log')
    ax.set_title('Degree distribution of r/harrypotter network')
    ax.set_xlabel('Degree')
    ax.set_ylabel('Probability Density')
   
    plt.show()
    
    if save_data:
        with open("plot_data/graph_reddit_data.pkl", "wb") as file:
            pickle.dump(G, file)


def emotion_bar_houses_reddit(df, source, target, tokens, beta = 10):
    E = df[tokens].apply(lambda x: pd.Series(emotion_score(x)))

    fig, ax = plt.subplots(2,2, dpi = 200, figsize = (20,10))
    fig.suptitle('Emotion distributions on r/harrypotter', fontsize = 28)
    colors = {'Gryffindor': 'C3', 'Hufflepuff': 'C1', 'Ravenclaw': 'C0', 'Slytherin': 'C2'}
    width = .08
    N = 4
    for i in range(N):
        for j in range(N):
           
            softmax = np.exp(beta*E.loc[j + N * i]) / np.sum(np.exp(beta*E.loc[j + N * i]))
            ax[i // 2, i % 2].bar(np.arange(8) + width *(N // 2 + j), np.exp(beta*E.loc[j + N * i]) / np.sum(np.exp(beta*E.loc[j + N * i])), width = width,
                                                                                            zorder = 3,
                                                                                            label = df[target].loc[j + N * i],
                                                                                            alpha = .8,
                                                                                            color = colors[df[target].loc[j + N * i]])

        ax[i // 2, i % 2].set_xticks(np.arange(8) + width *N)
        ax[i // 2, i % 2].set_xticklabels(E.columns)
        ax[i // 2, i % 2].set_title(f'Softmax Distribution of Emotions for {df[source].loc[j + N *i]}')
        ax[i // 2, i % 2].set_ylabel('Probability')

        ax[i // 2, i % 2].grid(linestyle = '--')
        ax[i // 2, i % 2].legend(loc = 'upper left')
    plt.show()


def configModelModularity(G, partition, houses, K = 100, save_data = False):
    N = list(dict(G.in_degree()).values())
    M = list(dict(G.out_degree()).values())
    cols = [data['group'] for _, data in G.nodes(data = True)]
    modularity = []
    for i in tqdm(range(K)):
        config_model = nx.generators.degree_seq.directed_configuration_model(N,M, create_using=nx.DiGraph(), seed = np.random.randint(0, 10e4))
        for i, (node, data) in enumerate(config_model.nodes(data = True)):
            data['group'] = cols[i]
        partition2 = [set([node for node, data in config_model.nodes(data = True) if data['group'] == house]) for house in set(houses.values())]

        modularity.append(nx.algorithms.community.quality.modularity(config_model,partition2, weight = None))
    fig, ax = plt.subplots(dpi = 150)
    ax.hist(modularity, bins = 30, alpha = .7, zorder = 3, density = True)
    ax.grid(linestyle = '--')
    ax.axvline(nx.algorithms.community.quality.modularity(G,partition, weight = 'weight'), label = 'True Modularity', color = 'red')
    ax.set_xlabel('Modularity')
    ax.set_ylabel('Probability Density')
    ax.set_title('Modularity Distribution for Config. Model')
    ax.legend()
    if save_data:
        with open("plot_data/modularity_reddit_data.pkl", "wb") as file:
            pickle.dump((modularity, G, partition), file)



def Louvain_Stuff(G, partition,houses, t, show = True, save_data = True):
    import community
    g = G.to_undirected().copy()
    for _, _, data in g.edges(data = True):
        data['weight'] = (data['weight'] +1) /(2)
    P = community.best_partition(g)
    partition2 = [set() for i in range(max(P.values())+1)]
    for c, v in P.items():
        partition2[v].add(c)

    M = np.zeros((len(partition), len(partition2)))
    for i in range(len(partition)):
        for j in range(len(partition2)):
            M[i,j] = sum([name in partition2[j] for name in partition[i]])/len(partition[i])

    fig, ax = plt.subplots(dpi = 100, figsize = (10,5))
    plt.imshow(np.delete(M, np.sum(M, axis = 0) < t, 1))
    cbar = plt.colorbar(extend = 'both')
    cbar.set_label("Percentage of Hogwwarts House")
    ax.set_yticks(range(4))
    ax.set_yticklabels(list(set(houses.values())))
    ax.set_title("Hogwarts House Split vs. Louvain Community Split")
    if show:
        plt.show()
    print(f"The modularity of the Louvain Community Split was: {nx.algorithms.community.quality.modularity(g,partition2, weight = 'weight')}")

    if save_data:
        with open("plot_data/louvain_reddit_data.pkl", "wb") as file:
            pickle.dump((M, houses), file)