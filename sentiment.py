import pandas as pd
import nltk
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import numpy as np

hedonometer, emotion_lex = pd.read_csv('Sentiment_tools/Hedonometer.csv'), pd.read_csv('Sentiment_tools/Emotion_lexicon.csv')
analyzer = SentimentIntensityAnalyzer()

emotions = [a for a in emotion_lex][3:]
h_score = {hedonometer.Word[i]:hedonometer["Happiness Score"][i] for i in range(len(hedonometer))}
e_score = {A[0]: tuple([a for a in A[3:]]) for A in emotion_lex.values}

def happiness(doc):
    # Input: List of words
    # Output: Average Happiness score of the list

    fdist = nltk.FreqDist(doc)
    doc_filtered = [word for word in doc if (word in h_score.keys())]
    h_avg = [fdist[word]/len(doc_filtered)*h_score[word]  for word in set(doc_filtered)]

    return sum(h_avg)

def emotion_score(doc):
    # Input: List of words
    # Output: Dictionary of average emotion score

    fdist = nltk.FreqDist(doc)
    doc_filtered = [word for word in doc if (word in e_score.keys())]
    
    if doc_filtered:
        emotion_score = np.mean([e_score[word] for word in doc_filtered], axis = 0)
        emotion = {emotions[i]: emotion_score[i] for i in range(len(emotions))}
        return emotion
    else:
        return {emotions[i]: 0 for i in range(len(emotions))}
    return doc_filtered

def vader_sentiment(doc):
    # Input: List of sentences (1 or more words and punctuatoin)
    # Output: Average Vader sentiment - ie. the average compound score:
    #         The compound score is computed by summing the valence scores of each word in the lexicon,
    #         adjusted according to the rules, and then normalized to be between -1 (most extreme negative) and +1 (most extreme positive).
    #         Positive sentiment: compound > 0.5
    #         Neutral sentiment:  -0.5 < compound < 0.5
    #         Negative sentiment:  compound < -0.5

    return np.mean([analyzer.polarity_scores(sentence)['compound'] for sentence in doc])

def TF_IDF(docs_to_analyse, all_docs):
    # Input: 
    #        - The documents to be analysed: each document as a list of words
    #        - All documents to comput IDF score: each document as a list of words
    # Output:
    #        - TF score of words in documents to be analysed
    #        - TF-IDF score of words in documents to be analysed
    TF = []
    for doc in docs_to_analyse:
        N = len(doc)
        freqdist = nltk.FreqDist(doc)
        tf = {word: round(count/N,5) for word, count in list(freqdist.most_common())}
        tf = nltk.FreqDist(tf)
        TF.append(tf)

    terms = set().union(*[doc for doc in docs_to_analyse])
    N_docs = len(all_docs) 

    doc_sets = [set(doc) for doc in all_docs]
    IDF = {}

    for term in terms:
        idf = np.log(N_docs/sum([term in doc_set for doc_set in doc_sets]))
        IDF[term] = idf
    TF_IDF = []
    print(len(TF))
    for tf in TF:
        tf_idf = nltk.FreqDist({word:count * IDF[word] for word, count in tf.most_common()})
        TF_IDF.append(tf_idf)

    return TF, TF_IDF


