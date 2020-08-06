import Cache from "../../../lib/cache";
import * as Db from "../../../lib/database";
import handler from "../shorten";

const mockDbSave = jest.spyOn(Db, "save");
const mockCacheSet = jest.spyOn(Cache, "set");
const mockedResponseJson = jest.fn();
const mockedResponse = { status: jest.fn(() => ({ json: mockedResponseJson }))}
const exampleRequest = { query: { url: "https://example.test" }}
const exampleRecord = { code: "example", destination: "http://example.com" };

beforeEach(() => {
  mockDbSave.mockClear()
  mockCacheSet.mockClear()
  mockedResponseJson.mockClear()
  mockedResponse.status.mockClear()
});


test("a url is shortened and saved to both the db and cache", async () => {
  mockCacheSet.mockImplementation(() => new Promise(resolve => resolve(true)))
  mockDbSave.mockImplementation(() => new Promise(resolve => resolve({ rows: [exampleRecord] })))

  await handler(exampleRequest, mockedResponse)

  expect(mockDbSave).toHaveBeenCalledTimes(1)
  expect(mockCacheSet).toHaveBeenCalledTimes(1)
  expect(mockDbSave.mock.calls[0][1]).toEqual(exampleRequest.query.url)
  expect(mockCacheSet.mock.calls[0][1]).toEqual("{\"code\":\"example\",\"destination\":\"http://example.com\"}")
  expect(mockedResponse.status).toHaveBeenCalledTimes(1)
  expect(mockedResponse.status.mock.calls[0]).toEqual([200])
  expect(mockedResponseJson).toHaveBeenCalledTimes(1)
  expect(mockedResponseJson.mock.calls[0]).toEqual([exampleRecord])
})

