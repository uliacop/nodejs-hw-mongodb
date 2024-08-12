import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  patchContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });
    res.status(200).json({
      status: res.statusCode,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      message: `Successfully found contact with id ${req.params.contactId}`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const contact = await patchContactById(req.params.contactId, req.body);
    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const contact = await deleteContactById(req.params.contactId);
    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
