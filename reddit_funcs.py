import os
from psaw import PushshiftAPI
import pandas as pd
import numpy as np
import datetime
import matplotlib.pyplot as plt
from tqdm import tqdm
import datetime
import pickle as pkl
from wordcloud import WordCloud
import nltk
import re
from PIL import Image

DATA_FOLDER = 'reddit_data'
RAW_DATA_FILENAME = os.path.join(DATA_FOLDER, 'HP_raw_data.csv')
PROCESSED_FILENAME = os.path.join(DATA_FOLDER, 'HP_processed_data.csv')
AUTHOR_SUBREDDIT_FILENAME = os.path.join(DATA_FOLDER, 'HP_author_subreddit_data.csv')
AUTHOR_POSTS_FILENAME = os.path.join(DATA_FOLDER, 'HP_chosen_author_posts_data.csv')

if not os.path.isdir(DATA_FOLDER):
    os.mkdir(DATA_FOLDER)

def fetch_data(filename = RAW_DATA_FILENAME):
    return 1
    api = PushshiftAPI()

    if os.path.exists(RAW_DATA_FILENAME):
        print('Loading existing raw data')
        df_submissions = pd.read_csv(RAW_DATA_FILENAME)
        print('Loaded raw data')
    else:
        my_subreddit = "harrypotter"
        date1 = int(datetime.datetime(2021, 1, 1).timestamp())
        date2 = int(datetime.datetime(2021, 3, 25).timestamp())
        #query = "Gryffindor"

        gen = api.search_submissions(subreddit = my_subreddit,
                                    after = date1,
                                    before = date2)

        results = list(gen)

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
        if not os.path.exists(RAW_DATA_FILENAME):
            print('Saving raw data file..')
            df_submissions.to_csv(RAW_DATA_FILENAME, index=False)
            print(f'Raw data saved to {RAW_DATA_FILENAME}')
        else:
            print(f'Previous version of raw data exists in {RAW_DATA_FILENAME}')
    print(df_submissions)
    return df_submissions