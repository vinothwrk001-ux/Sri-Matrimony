const mongoose = require('mongoose');

// ContactMessage Schema
const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'in_progress', 'resolved'], default: 'new' },
  resolvedNotes: { type: String, default: '' },
}, { timestamps: true });

// Report Schema
const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String, required: true },
  details: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'investigating', 'resolved', 'dismissed'], default: 'pending' },
  actionTaken: { type: String, default: '' },
}, { timestamps: true });

// Block Schema
const blockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blockedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String, default: 'User requested block' },
}, { timestamps: true });
blockSchema.index({ user: 1, blockedUser: 1 }, { unique: true });

// WebsiteSetting Schema
const websiteSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  description: { type: String, default: '' },
}, { timestamps: true });

// AuditLog Schema
const auditLogSchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actorRole: { type: String, default: 'system' },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: String },
  details: { type: Object, default: {} },
  ipAddress: { type: String, default: '' },
}, { timestamps: true });

module.exports = {
  ContactMessage: mongoose.model('ContactMessage', contactMessageSchema),
  Report: mongoose.model('Report', reportSchema),
  Block: mongoose.model('Block', blockSchema),
  WebsiteSetting: mongoose.model('WebsiteSetting', websiteSettingSchema),
  AuditLog: mongoose.model('AuditLog', auditLogSchema),
};
