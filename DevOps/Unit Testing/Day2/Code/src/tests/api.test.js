jest.mock("axios")

const { fetchPost } = require("../api");
const axios = require("axios");


beforeEach(() => {
    jest.clearAllMocks();
});

describe("fetchPost", () => {
    it("throws if the endpoint is invalid", async () => {
        axios.get.mockRejectedValueOnce(new Error("Network error"));
        await expect(async ()=> await fetchPost(123)).rejects.toThrowError();
});
    it("throw if the post does not exist", async () => {
        axios.get.mockResolvedValue({ data: null });
        await expect(fetchPost(123)).rejects.toThrow("Post not found");
    });

    it("returns the post data if found", async () => {
        const fakePost = { id: 123, title: "Test Post" };
        axios.get.mockResolvedValue({ data: fakePost });
        const result = await fetchPost(123);
        expect(result).toEqual({ id: 123, title: "Test Post" });
    });
});