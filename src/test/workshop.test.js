
import { createWorkShopController } from '../controllers/workshop.controller';
import prisma from '../prismaConfig';
import httpStatus from 'http-status';
import { ApiError } from '../error/apierror';
import { workShopMessages } from '../utils/constant';

jest.mock('../prismaConfig', () => ({
  workshop: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

describe('createWorkShopController', () => {
  it('should create a new workshop and return 201', async () => {
    const mockReq = {
      body: {
        title: 'Yoga Basics',
        description: 'Learn yoga',
        date: '2025-07-10',
      },
    };

    const newWorkshop = {
      id: 1,
      title: mockReq.body.title,
      description: mockReq.body.description,
      date: new Date(mockReq.body.date),
    };

    prisma.workshop.findFirst.mockResolvedValue(null); 
    prisma.workshop.create.mockResolvedValue(newWorkshop);

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await createWorkShopController(mockReq, mockRes);

    expect(prisma.workshop.findFirst).toHaveBeenCalledWith({
      where: { title: mockReq.body.title },
    });
    expect(prisma.workshop.create).toHaveBeenCalledWith({
      data: {
        ...mockReq.body,
        date: new Date(mockReq.body.date),
      },
    });
    expect(mockRes.json).toHaveBeenCalledWith({
      data: newWorkshop,
      status: httpStatus.CREATED,
      message: workShopMessages.workShopCreated,
    });
  });

  it('should throw error if workshop already exists', async () => {
    const mockReq = {
      body: {
        title: 'Yoga Basics',
        description: 'Learn yoga',
        date: '2025-07-10',
      },
    };

    prisma.workshop.findFirst.mockResolvedValue({ id: 1, title: mockReq.body.title });

    const mockRes = {};
    const mockNext = jest.fn();

    await expect(createWorkShopController(mockReq, mockRes, mockNext)).rejects.toThrow(ApiError);
  });
});
