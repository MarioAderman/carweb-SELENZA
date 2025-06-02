import React, { useState, ChangeEvent, FormEvent } from 'react';
import apiClient from '../services/apiClient';

interface ImageUploaderProps {
  vehicleId: string;
  vehicleModel: string;
  onUploadSuccess?: (uploadedImages: any[]) => void;
  onUploadError?: (error: any) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  vehicleId,
  vehicleModel,
  onUploadSuccess,
  onUploadError,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
    setUploadMessage(null);
    setMessageType(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadMessage('Please select one or more images to upload.');
      setMessageType('error');
      return;
    }
    if (!vehicleId || !vehicleModel) {
        setUploadMessage('Vehicle ID and Model are required to upload images.');
        setMessageType('error');
        return;
    }

    setIsUploading(true);
    setUploadMessage('Uploading...');
    setMessageType(null);

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('vehicleImages', selectedFiles[i]);
    }

    try {
      // CORRECTED URL: Removed /upload
      const response = await apiClient.post(
        `/images/${vehicleId}/${encodeURIComponent(vehicleModel)}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUploadMessage(response.data.message || 'Upload successful!');
      setMessageType('success');
      setSelectedFiles(null);
      if (event.target instanceof HTMLFormElement) {
        event.target.reset();
      }
      if (onUploadSuccess && response.data.images) {
        onUploadSuccess(response.data.images);
      }
    } catch (error: any) {
      console.error('Error uploading images:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during upload.';
      setUploadMessage(`Upload failed: ${errorMessage}`);
      setMessageType('error');
      if (onUploadError) {
        onUploadError(error);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const getMessageClasses = () => {
    if (!uploadMessage) return 'hidden';
    if (messageType === 'success') return 'text-green-600 bg-green-100 border-green-300';
    if (messageType === 'error') return 'text-red-600 bg-red-100 border-red-300';
    return 'text-gray-600 bg-gray-100 border-gray-300'; // For 'Uploading...'
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mt-6 shadow-md bg-white">
      <h4 className="text-xl font-semibold text-gray-700 mb-4">Upload Images</h4>
      <p className="text-sm text-gray-600 mb-4">
        For Vehicle ID: <strong className="text-indigo-600">{vehicleId || '(Not Set)'}</strong>,
        Model: <strong className="text-indigo-600">{vehicleModel || '(Not Set)'}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
            Select images (JPEG, PNG, WEBP, GIF)
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/webp, image/gif"
            disabled={isUploading || !vehicleId || !vehicleModel}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-700
                       hover:file:bg-indigo-100
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
            type="submit"
            disabled={isUploading || !selectedFiles || !vehicleId || !vehicleModel}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : 'Upload Selected Images'}
        </button>
      </form>
      {uploadMessage && (
        <p className={`mt-4 p-3 rounded-md border text-sm ${getMessageClasses()}`}>
          {uploadMessage}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
