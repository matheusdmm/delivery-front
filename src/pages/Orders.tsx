import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../graphql/mutations';
import { supabase } from '../../supabase.config';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Label } from '@/src/components/ui/label';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';

import { Navbar } from '../components/Navbar';

const foodOptions = [
  { name: 'Pizza', size: 'Grande', flavors: ['Calabresa', 'Chocolate'] },
  { name: 'Hamburguer', size: 'Médio', flavors: ['Bacon'] },
  { name: 'Sushi', size: 'Pequeno', flavors: ['Salmão', 'Cream Cheese'] },
  { name: 'Refrigerante', size: '2L', flavors: [] },
];

const Orders = () => {
  const [customer, setCustomer] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCustomer(user.email || 'Cliente');
      }
    };
    fetchUser();
  }, []);

  const handleToggleItem = (itemName: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((i) => i !== itemName)
        : [...prev, itemName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itemsToSubmit = foodOptions
      .filter((item) => selectedItems.includes(item.name))
      .map((item) => ({
        name: item.name,
        quantity: 1,
        size: item.size,
        flavors: item.flavors ?? [],
      }));

    try {
      const res = await createOrder({
        variables: {
          input: {
            customer,
            items: itemsToSubmit,
          },
        },
      });
      console.log('Pedido criado:', res.data.createOrder);
    } catch (err) {
      console.error('Erro ao criar pedido:', err);
    }
  };

  const renderFoodOptions = (item: (typeof foodOptions)[0]) => {
    if (item.name === 'Refrigerante') {
      return (
        <div key={item.name} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={item.name}
              checked={selectedItems.includes(item.name)}
              onCheckedChange={() => handleToggleItem(item.name)}
            />
            <Label htmlFor={item.name} className="text-sm">
              {item.name} ({item.size})
            </Label>
          </div>
        </div>
      );
    } else {
      return (
        <div key={item.name} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={item.name}
              checked={selectedItems.includes(item.name)}
              onCheckedChange={() => handleToggleItem(item.name)}
            />
            <Label htmlFor={item.name} className="text-sm">
              {item.name} ({item.size})
            </Label>
          </div>
          {item.flavors && item.flavors.length > 0 && (
            <div className="ml-4 space-y-2">
              <span className="text-xs font-medium">Sabores:</span>
              {item.flavors.map((flavor) => (
                <div key={flavor} className="flex items-center space-x-2">
                  <Checkbox
                    id={flavor}
                    checked={selectedItems.includes(flavor)}
                    onCheckedChange={() => handleToggleItem(flavor)}
                  />
                  <Label htmlFor={flavor} className="text-sm">
                    {flavor}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <Navbar />




      <div className="flex min-h-screen items-center justify-center bg-white p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center">Criar Pedido</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset className="space-y-4">
                {foodOptions.map((item) => renderFoodOptions(item))}
              </fieldset>

              <Button
                type="submit"
                disabled={!customer || selectedItems.length === 0}
                className="w-full"
              >
                Fazer Pedido
              </Button>
            </form>

            {loading && (
              <p className="text-sm text-gray-600">Enviando pedido...</p>
            )}
            {error && (
              <p className="text-sm text-red-500">Erro: {error.message}</p>
            )}
            {data && (
              <div className="text-sm text-green-600">
                Pedido criado com sucesso! ID: {data.createOrder.id}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Orders;
