import request from "supertest";
import app from "../../index";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { uploadToS3, deleteFromS3 } from "../config/s3Config";


jest.mock(
  "../config/s3Config",
  () =>
    ({
      uploadToS3: {
        single: jest
          .fn()
          .mockImplementation((fieldName) => (req:any, res:any, next:any) => {
            req.file = {
              location: "https://fake-s3-url.com/test-document.pdf",
            };
            next();
          }),
      },
      deleteFromS3: jest.fn().mockResolvedValue(undefined),
    } as {
      uploadToS3: { single: jest.Mock };
      deleteFromS3: jest.Mock;
    })
);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Document Operations", () => {
  it("should upload a document", async () => {
    const res = await request(app)
      .post("/api/documents")
      .attach("document", Buffer.from("fake pdf content"), "test.pdf");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Document uploaded successfully");
    expect(res.body.url).toBe("https://fake-s3-url.com/test-document.pdf");
  });

  it("should delete a document", async () => {
    const res = await request(app)
      .delete("/api/documents")
      .send({ key: "test-document.pdf" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Document deleted successfully");
    expect(deleteFromS3).toHaveBeenCalledWith("test-document.pdf");
  });
});
