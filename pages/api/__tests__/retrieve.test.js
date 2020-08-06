import Cache from "../../../lib/cache";
import * as Db from "../../../lib/database";
import handler from "../retrieve";

const mockDbGet = jest.spyOn(Db, "get");
const mockCacheGet = jest.spyOn(Cache, "get");
const mockedResponseJson = jest.fn();
const mockedResponse = { status: jest.fn(() => ({ json: mockedResponseJson }))}
const exampleRequest = { query: { code: "example" }}
const exampleRecord = { code: "example", destination: "http://example.com" };

beforeEach(() => {
  mockDbGet.mockClear()
  mockCacheGet.mockClear();
  mockedResponseJson.mockClear();
  mockedResponse.status.mockClear();
});

test("cache is hit first for results", async () => {
  mockCacheGet.mockImplementation(() => new Promise(resolve => resolve(JSON.stringify(exampleRecord))));

  await handler(exampleRequest, mockedResponse)

  expect(mockCacheGet).toHaveBeenCalledTimes(1)
  expect(mockCacheGet.mock.calls[0]).toEqual([exampleRequest.query.code])
  expect(mockedResponse.status).toHaveBeenCalledTimes(1)
  expect(mockedResponse.status.mock.calls[0]).toEqual([200])
  expect(mockedResponseJson).toHaveBeenCalledTimes(1)
  expect(mockedResponseJson.mock.calls[0]).toEqual([exampleRecord])
})

test("database is only hit if cache is empty", async () => {
  mockCacheGet.mockImplementation(() => new Promise(resolve => resolve(null)))
  mockDbGet.mockImplementation(() => new Promise(resolve => resolve({ rows: [exampleRecord] })))

  await handler(exampleRequest, mockedResponse)

  expect(mockCacheGet).toHaveBeenCalledTimes(1)
  expect(mockDbGet).toHaveBeenCalledTimes(1)
  expect(mockDbGet.mock.calls[0]).toEqual([exampleRequest.query.code])
  expect(mockedResponse.status).toHaveBeenCalledTimes(1)
  expect(mockedResponse.status.mock.calls[0]).toEqual([200])
  expect(mockedResponseJson).toHaveBeenCalledTimes(1)
  expect(mockedResponseJson.mock.calls[0]).toEqual([exampleRecord])
})

test("404 is returned if nothing in database or cache", async () => {
    mockCacheGet.mockImplementation(() => new Promise(resolve => resolve(null)))
    mockDbGet.mockImplementation(() => new Promise(resolve => resolve({ rows: [] })))

    await handler(exampleRequest, mockedResponse)

    expect(mockCacheGet).toHaveBeenCalledTimes(1)
    expect(mockDbGet).toHaveBeenCalledTimes(1)
    expect(mockedResponse.status).toHaveBeenCalledTimes(1)
    expect(mockedResponse.status.mock.calls[0]).toEqual([404])
})
