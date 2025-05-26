import React, { useState, useEffect } from 'react';

// Define the structure for filter values
export interface VehicleFilters {
  brand?: string;
  model?: string;
  minYear?: number | string; // string to allow empty input
  maxYear?: number | string;
  minPrice?: number | string;
  maxPrice?: number | string;
  // Add more filters as needed: mileage, fuel_type, transmission, etc.
}

interface VehicleFilterControlsProps {
  onFilterChange: (filters: VehicleFilters) => void;
  // Optional: Pass down available brands/models if you want to populate dropdowns dynamically
  // availableBrands?: string[];
  // availableModels?: string[]; // This would likely be dependent on selected brand
}

const VehicleFilterControls: React.FC<VehicleFilterControlsProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<VehicleFilters>({
    brand: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === '' ? undefined : (name.includes('Year') || name.includes('Price')) ? Number(value) : value,
    }));
  };

  // Debounce filter changes or apply on a button click
  useEffect(() => {
    // Simple debounce: apply filters 500ms after the user stops typing
    const handler = setTimeout(() => {
      // Remove empty string properties before calling onFilterChange
      const activeFilters = Object.entries(filters).reduce((acc, [key, val]) => {
        if (val !== '' && val !== undefined && !(typeof val === 'number' && isNaN(val))) {
          acc[key as keyof VehicleFilters] = val;
        }
        return acc;
      }, {} as VehicleFilters);
      onFilterChange(activeFilters);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters, onFilterChange]);

  // Or, if you prefer an "Apply Filters" button:
  // const handleApplyFilters = () => {
  //   onFilterChange(filters);
  // };

  return (
    <div className="p-6 mb-8 bg-selenza-black border border-selenza-dark-gray rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-selenza-white mb-4">Filtrar Vehículos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Brand Filter (Dropdown or Text Input) */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-selenza-cool-gray mb-1">
            Marca
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={filters.brand || ''}
            onChange={handleChange}
            placeholder="Ej: Toyota"
            className="w-full p-2 bg-selenza-dark-gray border border-selenza-cool-gray rounded-md text-selenza-white focus:ring-selenza-bright-red focus:border-selenza-bright-red"
          />
          {/* Example for a select dropdown if you have a predefined list of brands
          <select name="brand" id="brand" value={filters.brand || ''} onChange={handleChange} className="...">
            <option value="">Todas las Marcas</option>
            {availableBrands?.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          */}
        </div>

        {/* Model Filter */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-selenza-cool-gray mb-1">
            Modelo
          </label>
          <input
            type="text"
            name="model"
            id="model"
            value={filters.model || ''}
            onChange={handleChange}
            placeholder="Ej: Corolla"
            className="w-full p-2 bg-selenza-dark-gray border border-selenza-cool-gray rounded-md text-selenza-white focus:ring-selenza-bright-red focus:border-selenza-bright-red"
          />
        </div>

        {/* Min Year Filter */}
        <div>
          <label htmlFor="minYear" className="block text-sm font-medium text-selenza-cool-gray mb-1">
            Año (Desde)
          </label>
          <input
            type="number"
            name="minYear"
            id="minYear"
            value={filters.minYear || ''}
            onChange={handleChange}
            placeholder="Ej: 2015"
            className="w-full p-2 bg-selenza-dark-gray border border-selenza-cool-gray rounded-md text-selenza-white focus:ring-selenza-bright-red focus:border-selenza-bright-red"
          />
        </div>

        {/* Max Year Filter */}
        <div>
          <label htmlFor="maxYear" className="block text-sm font-medium text-selenza-cool-gray mb-1">
            Año (Hasta)
          </label>
          <input
            type="number"
            name="maxYear"
            id="maxYear"
            value={filters.maxYear || ''}
            onChange={handleChange}
            placeholder="Ej: 2023"
            className="w-full p-2 bg-selenza-dark-gray border border-selenza-cool-gray rounded-md text-selenza-white focus:ring-selenza-bright-red focus:border-selenza-bright-red"
          />
        </div>

        {/* Min Price Filter */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-selenza-cool-gray mb-1">
            Precio Mín. (MXN)
          </label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={filters.minPrice || ''}
            onChange={handleChange}
            placeholder="Ej: 50000"
            className="w-full p-2 bg-selenza-dark-gray border border-selenza-cool-gray rounded-md text-selenza-white focus:ring-selenza-bright-red focus:border-selenza-bright-red"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-selenza-cool-gray mb-1">
            Precio Máx. (MXN)
          </label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={filters.maxPrice || ''}
            onChange={handleChange}
            placeholder="Ej: 300000"
            className="w-full p-2 bg-selenza-dark-gray border border-selenza-cool-gray rounded-md text-selenza-white focus:ring-selenza-bright-red focus:border-selenza-bright-red"
          />
        </div>
        {/* Add a "Clear Filters" button if desired */}
        {/* <button onClick={() => { setFilters({}); onFilterChange({}); }} className="...">Limpiar Filtros</button> */}
      </div>
      {/* If using an "Apply Filters" button:
      <div className="mt-6 text-right">
        <button
          onClick={handleApplyFilters}
          className="bg-selenza-bright-red hover:bg-selenza-pure-red text-white font-semibold py-2 px-6 rounded-md transition-colors"
        >
          Aplicar Filtros
        </button>
      </div>
      */}
    </div>
  );
};

export default VehicleFilterControls;