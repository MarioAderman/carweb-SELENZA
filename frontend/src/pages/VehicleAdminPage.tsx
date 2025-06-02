import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import PageLayout from '../components/layout/PageLayout';

const VehicleAdminPage: React.FC = () => {
  const [vehicleIdInput, setVehicleIdInput] = useState<string>('');
  const [vehicleModelInput, setVehicleModelInput] = useState<string>('');

  const [currentVehicleId, setCurrentVehicleId] = useState<string>('');
  const [currentVehicleModel, setCurrentVehicleModel] = useState<string>('');
  const [contextMessage, setContextMessage] = useState<string | null>(null);


  const handleSetVehicleContext = () => {
    if (!vehicleIdInput.trim() || !vehicleModelInput.trim()) {
        setContextMessage("Please enter both Vehicle ID and Model.");
        return;
    }
    setCurrentVehicleId(vehicleIdInput.trim());
    setCurrentVehicleModel(vehicleModelInput.trim());
    setContextMessage(`Context set for Vehicle ID: ${vehicleIdInput.trim()}, Model: ${vehicleModelInput.trim()}`);
  };

  const handleUploadSuccess = (uploadedImages: any[]) => {
    console.log('Admin Page: Images uploaded successfully:', uploadedImages);
    // The ImageUploader component will show its own success message
  };

  const handleUploadError = (error: any) => {
    console.error('Admin Page: Upload failed:', error);
    // The ImageUploader component will show its own error message
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Vehicle Administration</h1>
          <p className="text-gray-600">Manage vehicle details and images.</p>
        </header>
        
        <section className="mb-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Set Vehicle Context</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter the ID and Model of the vehicle you want to manage images for.
            In a real application, you'd typically select a vehicle from a list.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="vehicleIdAdmin" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle ID
              </label>
              <input
                type="text"
                id="vehicleIdAdmin"
                value={vehicleIdInput}
                onChange={(e) => setVehicleIdInput(e.target.value)}
                placeholder="e.g., 1 or 42"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="vehicleModelAdmin" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Model
              </label>
              <input
                type="text"
                id="vehicleModelAdmin"
                value={vehicleModelInput}
                onChange={(e) => setVehicleModelInput(e.target.value)}
                placeholder="e.g., Corolla or F-150"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button 
                onClick={handleSetVehicleContext} 
                className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Set Vehicle for Upload
            </button>
            {contextMessage && (
                <p className={`mt-2 text-sm ${contextMessage.startsWith("Please") ? "text-red-600" : "text-green-600"}`}>
                    {contextMessage}
                </p>
            )}
          </div>
        </section>

        {currentVehicleId && currentVehicleModel ? (
          <ImageUploader
            vehicleId={currentVehicleId}
            vehicleModel={currentVehicleModel}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        ) : (
          <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md">
            <p className="font-medium">Image Uploader Disabled</p>
            <p>Please set the Vehicle ID and Model above to enable image uploads for a specific vehicle.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default VehicleAdminPage;
