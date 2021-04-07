import pandas as pd
from requests import get
from bs4 import BeautifulSoup
from argparse import ArgumentParser

def scrape_chapters(url):
    response = get(url)
    html_soup = BeautifulSoup(response.text, 'html.parser')
    chapter_soup = html_soup.find_all('table')

    # Extract book chapter data
    book_chapters = pd.DataFrame({
        'Global Chapter': pd.Series([], dtype='int'), 
        'Local Chapter': pd.Series([], dtype='int'), 
        'Title': pd.Series([], dtype='str'), 
        'Approx Story Time': pd.Series([], dtype='datetime64[ns]')
        })
    for table in chapter_soup:
        for row in table.find_all('tr')[1:]:
            data = row.find_all('td')
            chapter_data = {
                'Global Chapter': int(data[0].text), 
                'Local Chapter': int(data[1].text), 
                'Title': data[3].text,  
                'Approx Story Time': pd.to_datetime(data[-1].text, infer_datetime_format=True)
            }
            book_chapters = book_chapters.append(chapter_data, ignore_index=True)
    
    return book_chapters


if __name__ == '__main__':
    arg_parser = ArgumentParser()
    arg_parser.add_argument('-output', '-o', type=str, help='Output path for saving book chapter dataframe as pickle file')

    args = arg_parser.parse_args()

    # Scrape Harry Potter book chapters
    url = 'https://harrypotter.fandom.com/wiki/List_of_chapters_in_the_Harry_Potter_novels'
    book_chapters = scrape_chapters(url)

    # Save dataframe as pickle file
    book_chapters.to_pickle(args.output)