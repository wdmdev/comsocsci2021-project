import pickle as pkl
from tqdm import tqdm
from requests import get
from bs4 import BeautifulSoup
from argparse import ArgumentParser

def scrape_hogwarts_houses(url):
    response = get(url)
    html_soup = BeautifulSoup(response.text, 'html.parser')
    character_soup = html_soup.find_all('ul', class_ = 'list-archive-list')
    characters = [c.contents[0].text for c in character_soup[0].contents]

    return characters


if __name__ == '__main__':
    arg_parser = ArgumentParser()
    arg_parser.add_argument('-output', '-o', type=str, help='Output path for saving character by house dictionary as pickle file')

    args = arg_parser.parse_args()

    # Scrape characters by Hogwarts House
    characters_by_house = {
        'Gryffindor': [],
        'Hufflepuff': [],
        'Ravenclaw': [],
        'Slytherin': [],
        'House Unknown': []
    }

    websites = {
        'Gryffindor': 'https://www.hp-lexicon.org/list/schools/hogwarts/witches-wizards-hogwarts/hogwarts-students/gryffindor/',
        'Hufflepuff': 'https://www.hp-lexicon.org/list/schools/hogwarts/witches-wizards-hogwarts/hogwarts-students/hufflepuff/',
        'Ravenclaw': 'https://www.hp-lexicon.org/list/schools/hogwarts/witches-wizards-hogwarts/hogwarts-students/ravenclaw/',
        'Slytherin': 'https://www.hp-lexicon.org/list/schools/hogwarts/witches-wizards-hogwarts/hogwarts-students/slytherin/',
        'House Unknown': 'https://www.hp-lexicon.org/list/schools/hogwarts/witches-wizards-hogwarts/hogwarts-students/house-unknown/'
    }   

    print('Scraping Hogwarts House data for characters...\n')
    for house, url in tqdm(websites.items()):
        characters_by_house[house] += scrape_hogwarts_houses(url)

    # Save dictionary as pickle file
    with open(args.output, 'wb') as file:
        pkl.dump(characters_by_house, file)