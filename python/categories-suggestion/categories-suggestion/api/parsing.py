import requests
from urllib.parse import urlparse, urljoin
import re
from bs4 import BeautifulSoup

garbage = ['.com', 'www', '.ru']

def parse_text_from_url(url: str):
    parsed_url = urlparse(url)
    path = parsed_url.path
    words = re.split(r'[-_/\.]', path)
    link_words = [word.lower() for word in words if word and 
                  word.lower() not in garbage and not word.isdigit()]

    return link_words

def parse_text_from_url_v2(url: str):
    try:
        if not urlparse(url).scheme:
            url = "http://" + url

        # Parse the URL
        parsed_url = urlparse(url)
        path = parsed_url.path
        
        words = re.split(r'[-_/\.]', path)
        garbage = {'the', 'and', 'or', 'is', 'are', 'on', 'in', 'at', 'to', 'a'}
        link_words = [word.lower() for word in words if word.lower() not in garbage and not word.isdigit()]

        # Fetch the content of the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for bad status codes
        soup = BeautifulSoup(response.content, 'html.parser')
        text = soup.get_text()

        # Process text to extract meaningful words
        additional_words = re.findall(r'\b\w+\b', text)
        additional_link_words = [word.lower() for word in additional_words if word.lower() not in garbage and not word.isdigit()]

        # Append extracted words from URL content
        link_words.extend(additional_link_words)

        # Extract metadata from the HTML of the page
        metadata_words = []
        metadata = {}
        meta_tags = soup.find_all('meta')
        for tag in meta_tags:
            if 'name' in tag.attrs and 'content' in tag.attrs:
                name = tag.attrs['name'].lower()
                content = tag.attrs['content']
                if 'description' in name or 'title' in name:
                    metadata_words.extend(re.findall(r'\b\w+\b', content.lower()))
                metadata[name] = content

        # Return a list of words from URL, descriptions, and titles from metadata
        return link_words + metadata_words

    except Exception as e:
        print(f"Error occurred while parsing URL: {e}")
        return []