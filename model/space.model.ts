import mongoose, { Document, Schema } from 'mongoose';

interface Workspace extends Document {
  name: string;
  description: string;
  imageUrls?: string[];
}

const workspaceSchema = new Schema<Workspace>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String], // Array of strings representing image URLs
  },
});

const WorkspaceModel = mongoose.model<Workspace>('Workspace', workspaceSchema);

export default WorkspaceModel;
