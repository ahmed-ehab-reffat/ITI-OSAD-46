const {fetchWithRetry} = require('./fetchWithRetry');
const apiClient = require('./apiClient');

jest.mock('./apiClient');

describe('fetchWithRetry', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('retry logic validation', () => {
    it('should return data on the first attempt if it succeeds', async () => {
      // setup
      const url = 'https://api.example.com/data';
      const expectedData = {id: 1};
      apiClient.getData.mockResolvedValue(expectedData);

      // exercise
      const result = await fetchWithRetry(url);

      // verify
      expect(result).toEqual(expectedData);
      expect(apiClient.getData).toHaveBeenCalledTimes(1);
    });

    it('should retry and succeed on the second attempt', async () => {
      // setup
      const url = 'https://api.example.com/data';
      const expectedData = {id: 1};
      apiClient.getData
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(expectedData);

      // exercise
      const result = await fetchWithRetry(url);

      // verify
      expect(result).toEqual(expectedData);
      expect(apiClient.getData).toHaveBeenCalledTimes(2);
    });

    it('should throw error after all attempts fail', async () => {
      // setup
      const url = 'https://api.example.com/data';
      const maxRetries = 3;
      const errorMessage = 'Timeout';
      apiClient.getData.mockRejectedValue(new Error(errorMessage));

      // exercise & verify
      await expect(fetchWithRetry(url, maxRetries)).rejects.toThrow(
        `Failed after ${maxRetries} attempts: ${errorMessage}`
      );
      expect(apiClient.getData).toHaveBeenCalledTimes(maxRetries);
    });

    it('should respect the maxRetries parameter (bonus)', async () => {
      // setup
      const url = 'https://api.example.com/data';
      const maxRetries = 1;
      apiClient.getData.mockRejectedValue(new Error('Fatal'));

      // exercise & verify
      await expect(fetchWithRetry(url, maxRetries)).rejects.toThrow(
        `Failed after ${maxRetries} attempts: Fatal`
      );
      expect(apiClient.getData).toHaveBeenCalledTimes(maxRetries);
    });
  });
});
