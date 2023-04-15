
def test_get_health_e2e(client):
    response = client.get('/health')
    assert response.status_code == 200