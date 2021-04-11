from bs4 import BeautifulSoup
import re
import pandas as pd

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



# fname = "Data/Book 1 - The Philosopher's Stone_djvu.txt.html"
# text = clean_book(fname) 
# # with open ("test.txt", "w", encoding='utf-8') as test:
# #     test.write(text)

# re_page = r"Page \| \d+ .+"
# print(re.search(re_page, text))

# chapters = pd.read_pickle("data/chapter_dataframe.pkl")


# print(chapters)