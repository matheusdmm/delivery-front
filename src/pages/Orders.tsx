import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER_MUTATION } from '../graphql/mutations';

const Orders = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [createOrder, { data, loading, error }] = useMutation(
    CREATE_ORDER_MUTATION
  );

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createOrder({
        variables: { items: selectedItems },
      });
      console.log('Pedido criado:', res.data.createOrder);
    } catch (err) {
      console.error('Erro ao criar pedido:', err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Logo"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Criar Pedido
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="block text-sm font-medium text-gray-900">
              Escolha suas comidas
            </p>
            <div className="mt-2 space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Pizza"
                  onChange={() => handleCheckboxChange('Pizza')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-900">Pizza</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Hamburguer"
                  onChange={() => handleCheckboxChange('Hamburguer')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-900">Hamburguer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Sushi"
                  onChange={() => handleCheckboxChange('Sushi')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-900">Sushi</span>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Fazer Pedido
            </button>
          </div>
        </form>

        {loading && <p className="mt-4 text-gray-600">Enviando pedido...</p>}
        {error && <p className="mt-4 text-red-500">Erro: {error.message}</p>}
        {data && (
          <div className="mt-4 text-green-600">
            Pedido criado com sucesso! ID: {data.createOrder.id}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
