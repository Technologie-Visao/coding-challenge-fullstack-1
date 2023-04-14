from TextureSuggester import TextureSuggester
import re

data_name = "green branch"
data_name_words = re.findall(r"[\w']+", data_name)
data_desc = "green tree"
data_desc_words = re.findall(r"[\w']+", data_desc)

ts = TextureSuggester()


def test_get_score_exact_match_name():
    score = ts.get_score(re.findall(r"[\w']+", "green tree"), data_name_words, multiplier=5)
    assert score == 10

def test_get_score_exact_match_desc():
    score = ts.get_score(re.findall(r"[\w']+", "green"), data_desc_words)
    assert score == 2

def test_get_score_substr_match_name():
    score = ts.get_score(re.findall(r"[\w']+", "gree tree"), data_name_words, multiplier=5)
    assert score == 5

def test_get_score_substr_match_desc():
    score = ts.get_score(re.findall(r"[\w']+", "tre"), data_desc_words)
    assert score == 1

def test_get_score_no_match_name():
    score = ts.get_score([""], data_name_words, multiplier=5)
    assert score == 0

def test_get_score_no_match_desc():
    score = ts.get_score([""], data_desc_words)
    assert score == 0


def test_get_suggestions_match():
    response = ts.get_suggestions("green", 5)
    assert response[0] == {'name': 'Shattered Glass', 'description': 'watermelon skin, clear, green and dark green stripes, realistic, highly-detailed', 'thumbnail_url': 'https://static-dev.withpoly.com/v3-voronoi/textures/previews/842de4e7-91bc-4364-8525-e9b19cd6c7a7.webp', 'score': 4}

def test_get_suggestions_match_limit():
    response = ts.get_suggestions("green", 2)
    assert len(response) == 2

def test_get_suggestions_match_default_limit():
    response = ts.get_suggestions("green")
    assert len(response) == 5

def test_get_suggestions_match_zero_limit():
    response = ts.get_suggestions("green", 0)
    assert len(response) == 0

def test_get_suggestions_no_match():
    response = ts.get_suggestions("", 5)
    assert response == []