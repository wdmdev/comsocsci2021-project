
import numpy as np
import pickle as pkl
import pandas as pd
import nltk
# from clean_books import clean_book
from sentiment import *
import os, re, sys
from difflib import SequenceMatcher
from tqdm import tqdm
import itertools
import networkx as nx
from collections import defaultdict
nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords
from wordcloud import WordCloud
from sentiment import TF_IDF 
import matplotlib.pyplot as plt
import community
from bs4 import BeautifulSoup

# A bit of plot setup
plt.rcParams["font.family"] = "serif"
plt.rcParams['font.size'] = 13

def clean_book(filename):
    with open(filename, encoding='utf-8') as bad_html:
        soup = BeautifulSoup(bad_html, features="html.parser")
    
    pretty = soup.prettify()
    start = re.search(r'<pre>.*', pretty).span()[1]
    end = re.search(r'<.pre>.*', pretty).span()[0]
    text = pretty[start:end]
    text = text.lstrip()
    text = text.rstrip()
    return text

def books_in_chapters(chapter_info):
    fname = "data/books_in_chapters.pkl"
    if os.path.exists(fname):
        with open('data/books_in_chapters.pkl', 'rb') as file:
            books_in_chapters = pkl.load(file)
    else:
        # Get a list of paths to books
        path = "data/books/"
        books = os.listdir(path)
        books.sort()
        books_in_chapters = []

        for i in tqdm(range(7), desc='Book Loop'): # For every book
            # Remove HTML TAGS and double spacing
            print("\n", file = sys.stderr)
            book = clean_book(path + books[i]) 
            # book = re.sub('\n{2,}', '\n', book)
            # Get chapters of book
            chapters = [chapter.upper() for chapter in chapter_info.loc[chapter_info["Book"] == i+1, "Title"]]

            # Split Lines and remove lines including page numbering or J.K. Rowling
            lines = [line for line in book.splitlines() if not re.search(r'Page \| [0-9]{1,} | J.K. Rowling', line)]        

            # Find lines with the title of the chapters
            chapter_idx = []
            for chapter in chapters:
                # Use SequenceMatcher to find similarity between line and a given chapter. Threshold of 0.6
                ties = [(i, line) for i, line in enumerate(lines) if SequenceMatcher(None, chapter, line).ratio() >.6]

                # If 2 or more lines have a similarity of above .6 with the chapter find the most similar
                idx, title = ties[np.argmax([SequenceMatcher(None, chapter, title).ratio() for _, title in ties])]
                chapter_idx.append(idx)
                print(title, chapter, file = sys.stderr)

            print("\n", file = sys.stderr)  
            # Get a list of chapters - List of strings
            chapters = ["\n".join(lines[chapter_idx[i]:chapter_idx[i+1] if len(chapters) > i+1 else None]) for i in range(len(chapter_idx))]

            chapters[:] = [re.sub(r'[a-zA-Z](\s){0,}(\n){2}','\n', re.sub(r'(\n){3,}','\n\n', chapter)) for chapter in chapters]
            books_in_chapters.append(chapters)  

        pkl.dump(books_in_chapters, open(fname,"wb")) 
    
    return books_in_chapters

def get_names(characters_by_communities):
    characters_by_communities_reverse = {val:key for key, value in characters_by_communities.items() for val in value if key != 'House Unknown'}
    characters_by_communities_reverse["Mr. Weasley"] = 'Gryffindor'
    characters_by_communities_reverse["Mrs. Weasley"] = 'Gryffindor'
    characters_by_communities_reverse["Crabbe"] = 'Slytherin'
    characters_by_communities_reverse["Goyle"] = 'Slytherin'
    characters_by_communities_reverse["Sirius"] = 'Gryffindor'
    del characters_by_communities_reverse["Albus Potter"]; del characters_by_communities_reverse["Su Li"]
    special_names = {'He-Who-Must-Not-Be-Named':'Voldemort', 'You-Know-Who':'Voldemort','Tom Riddle': 'Voldemort', 'Tom Marvolo Riddle':'Voldemort',
                    'Peter Pettigrew':'Wormtail', 'Weasley':'Ron', 'Potter':'Harry', 'Malfoy':'Draco', 'Tonks':'Nymphadora',
                    'Mr. Weasley':'mr. Weasley', 'Mrs. Weasley':'mrs. Weasley', 'Mr. Potter': 'Harry', 'Pettigrew':'Wormtail', 'Lupin': 'Remus'}

    names      = {name: name.split(" ")[0] 
                    for name in characters_by_communities_reverse.keys()
                    if ('the ' not in name.lower()) and ('.' not in name.lower()) and ('miss ' not in name.lower()) and ('sir ' not in name.lower()) }


    firstname     = {name.split(" ")[-1]: name.split(" ")[0] 
                    for name in characters_by_communities_reverse.keys()
                    if ('the ' not in name.lower()) and ('.' not in name.lower()) and ('miss ' not in name.lower()) and ('sir ' not in name.lower()) }

    # characters_by_communities_reverse
    names.update(firstname)
    names.update(special_names)
    del names["Black"]; del names["Riddle"]; del names["Merlin"]; del names["Slytherin"]; del names["Gryffindor"]; del names["Ravenclaw"]; del names["Hufflepuff"]

    return names, characters_by_communities_reverse

def get_interactions(names, books_in_chapters_names):
    chapters = [chapter for book in books_in_chapters_names for chapter in book]
    interactions = defaultdict(lambda: defaultdict(list))
    interactions_list = []
    names_ = set(list(names.values()) + ['he', 'she'])
    r = 2
    for j, chapter in tqdm(enumerate(chapters[:-1])):
        speeches, contexts, sources = [], [], []
        split = chapter.split("\n\n")
        for line in split:
            line = re.sub('\n', ' ', line)
            S = list(filter(None, re.split(r'“|”', re.sub('“', '“_', line))))
            if len(S) > 1:
                speech = ' '.join([s[1:] for s in S if s[0] == '_'])
                context = ' '.join([s for s in S if s[0] != '_'])
                N = [word for word in re.split(r'\s|\,|\.|\!|\?', context) if word in names_]
                source = None if not N else N[0]
                speeches.append(speech); contexts.append(context); sources.append(source)
            else:
                speeches.append(None); contexts.append(line); sources.append(None)

        
        for i in range(len(speeches)):
            speech, source, context = speeches[i], sources[i], contexts[i]
        
            if speech and source and source != 'he' and source != 'she':
                targets = set(sources[i-r:i] + sources[i+1:i+r+1]).difference(set((source,None, 'he', 'she')))
                
                for target in targets:
                    
                    
                    interactions[source][target].append((speech, j))
                    interactions_list.append((j, source, target, speech))
    return interactions, interactions_list

def create_network(interactions, names, characters_by_communities_reverse):
    def get_scores(source):
        targets = []
        C, S = [], []
        SW = stopwords.words("english")
        for target in interactions[source].keys():
            speeches, chapter = zip(*interactions[source][target])
            sentences = [sentence for speech in speeches for sentence in re.split(r'[\.\!\?]', re.sub(r'  |\\', ' ', speech)) if sentence and re.search(r'[a-zA-Z]', sentence)]
            
            compound = vader_sentiment(sentences)
            # words = [word.lower() for word in " ".join(sentences).split(" ") if word.isalpha() and word.lower() not in SW]
            # happy = (happiness(words)- 1)/(9-1) * (1 - (-1)) -1
            # H.append(happy)
            S.append(source), targets.append(target), C.append({'weight': compound}); 
        return S, targets, C

    G = nx.DiGraph()
    for source in interactions.keys():
        edges = list(zip(*get_scores(source)))
        G.add_edges_from(edges)
    # We will color the nodes according to their respective house colors
    colors = {'Gryffindor': 'red', 'Slytherin': 'darkgreen', 'Hufflepuff': 'orange', 'Ravenclaw': 'navy'}
    C = {val:colors[characters_by_communities_reverse[key]] for key, val in names.items() if key in characters_by_communities_reverse.keys()}
    nx.set_node_attributes(G, C, 'group')

    return G

def network_analysis(G, characters_by_communities_reverse, names, plot_type):
    colors = {'Gryffindor': 'red', 'Slytherin': 'darkgreen', 'Hufflepuff': 'orange', 'Ravenclaw': 'navy'} 
    C = {val:colors[characters_by_communities_reverse[key]] for key, val in names.items() if key in characters_by_communities_reverse.keys()}
    
    # density stuff
    edges = [data['weight'] for _, _, data in G.edges(data = True)]
    for _, _, data in G.edges(data = True):
        data['weight_norm'] = (data['weight'] - min(edges)) / (max(edges) - min(edges))
    partition1 = [set([node for node, data in G.nodes(data = True) if data['group'] == val]) for val in colors.values()]
    mod1 = nx.algorithms.community.quality.modularity(G,partition1, weight = 'weight_norm')
    mod2 = nx.algorithms.community.quality.modularity(G,partition1, weight = None)
    N = list(dict(G.in_degree()).values())
    M = list(dict(G.out_degree()).values())
    names_, _ = zip(*G.in_degree())
    cols = [C[name] for name in names_]
    modularity = []
    for i in range(1000):
        config_model = nx.generators.degree_seq.directed_configuration_model(N,M, create_using=nx.DiGraph())
        for i, (node, data) in enumerate(config_model.nodes(data = True)):
            data['group'] = cols[i]
        partition2 = [set([node for node, data in config_model.nodes(data = True) if data['group'] == val]) for val in colors.values()]

        modularity.append(nx.algorithms.community.quality.modularity(config_model,partition2, weight = None))

    # louvain stuff
    g = G.to_undirected().copy()
    for _, _, data in g.edges(data = True):
        data['weight'] = (data['weight'] - min(edges)) /(max(edges) - min(edges))
    P = community.best_partition(g)
    partition3 = [set() for i in range(max(P.values())+1)]
    for c, v in P.items():
        partition3[v].add(c)

    M = np.zeros((len(partition1), len(partition3)))
    for i in range(len(partition1)):
        for j in range(len(partition3)):
            M[i,j] = sum([name in partition3[j] for name in partition1[i]])/len(partition1[i])

    def plot_density_distribution():
        fig, ax = plt.subplots(dpi = 150, figsize = (8,4))
        ax.hist(modularity, bins = 50, density = True, zorder = 3, alpha = .8, label = 'Modularity Density Distribution of config. model')
        ax.axvline(mod2, color = 'blue', label = 'True modularity of House splitting (no weights)')
        ax.axvline(mod1, color = 'red', label = 'True modularity of House splitting (with weights)')
        ax.grid(linestyle = '--', zorder = 0)
        ax.set_xlabel('Modularity')
        ax.set_ylabel('Probability Density')
        ax.set_title('Density Distribution of Modularity for Config. Model vs. True Modularity')
        ax.legend()
        plt.show()

    def louvain_comparison():
        fig, ax = plt.subplots(dpi = 100, figsize = (10,5))
        plt.imshow(M)
        cbar = plt.colorbar(extend = 'both')
        cbar.set_label("Percentage of Hogwwarts House")
        ax.set_yticks(range(4))
        ax.set_yticklabels(list(colors.keys()))
        ax.set_title("Hogwarts House Split vs. Louvain Community Split")
        plt.show()

        print(f"The modularity of the Louvain Community Split was: {nx.algorithms.community.quality.modularity(g,partition3, weight = 'weight')}")

    def plot_degree_distribution():
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
        ax.set_title('Degree distribution of Harry Potter network')
        ax.set_xlabel('Degree')
        ax.set_ylabel('Probability Density')
        plt.show()

    if plot_type == "density":
        plot_density_distribution()
    elif plot_type == "louvain":
        louvain_comparison()
    elif plot_type == "degree":
        plot_degree_distribution()