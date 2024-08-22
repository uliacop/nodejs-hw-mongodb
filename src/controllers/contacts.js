import {
  createContact,
  updateContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  patchContactById,
} from '../services/contacts.js';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const contact = await getContactById(req.user._id, contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const contact = await createContact({
    ...req.body,
    photo: photoUrl,
    userId: req.user._id,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const contact = await patchContactById(contactId, {
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  });
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await updateContact(
    contactId,
    {
      ...req.body,
      userId: req.user._id,
      photo: req.file,
      name: req.name,
      phoneNumber: req.phoneNumber,
      email: req.email,
      isFavourite: req.isFavourite,
      contactType: req.contactType,
    },
    req.user._id,
  );

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully upserted a contact!`,
    data: contact,
  });
};
export const deleteContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const contact = await deleteContactById(req.user._id, contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
