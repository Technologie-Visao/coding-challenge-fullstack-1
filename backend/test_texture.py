import unittest
from falcon import testing
import main_server as app


class TestTexture(testing.TestCase):
    def setUp(self):
        super(TestTexture, self).setUp()
        self.app = app.create()


class TestTextureSuggestions(TestTexture):
    def test_get_texture_suggestion_success(self):
        result = self.simulate_get('/textures/suggestions',
                                   query_string='searchTerm=brick&itemsLimit=4')
        self.assertEqual(result.json, self.resp_success)
        self.assertEqual(result.status_code, 200)

    def test_get_texture_suggestion_missing_param(self):
        expected_result = 400
        result = self.simulate_get('/textures/suggestions',
                                   query_string='searchTerm=brick')
        self.assertEqual(result.status_code, expected_result)

    resp_success = [{"name": "Bricks", "description": "red brick, close up, highly detailed, porous and hard, slight sheen", "thumbnail_url": "https://static-dev.withpoly.com/v3-voronoi/textures/previews/ca0ed483-5178-405a-8d06-f1e0a6ac194d.webp"}, {"name": "Glow", "description": "Herringbone Bond Brick, extreme fine details, extreme high quality, realistic, brick", "thumbnail_url": "https://static-dev.withpoly.com/v3-voronoi/textures/previews/a68f6344-97d9-43b5-aaea-97376b0985aa.webp"}, {"name": "Plasma", "description": "handpainted crayons Bricks floor in a Psychedelic world like alice in wonderland", "thumbnail_url": "https://static-dev.withpoly.com/v3-voronoi/textures/previews/6ffd6c23-5e83-41ea-942b-72874c76c335.webp"}]


if '__name__' == '__main__':
    unittest.main()
