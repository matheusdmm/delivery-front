import { useQuery } from '@apollo/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Navbar } from '../components/Navbar';
import { GET_MY_ORDERS } from '../graphql/mutations';

export default function MyOrders() {
  const { data, loading, error } = useQuery(GET_MY_ORDERS);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-white p-4">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Meus Pedidos</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading && (
              <div className="p-4 border rounded-lg text-gray-600 text-center">
                Carregando pedidos...
              </div>
            )}

            {error && (
              <div className="p-4 border rounded-lg text-red-500 text-center">
                Erro ao carregar pedidos.
              </div>
            )}

            {!loading && data?.myOrders.length === 0 && (
              <div className="p-4 border rounded-lg text-gray-600 text-center">
                Nenhum pedido encontrado.
              </div>
            )}

            {!loading &&
              data?.myOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="p-4 border rounded-lg bg-gray-50 text-gray-800"
                >
                  <div>
                    <strong>Status:</strong> {order.status}
                  </div>
                  <div className="mt-2">
                    <strong>Itens:</strong>
                    <ul className="list-disc list-inside">
                      {order.items.map((item: any, idx: number) => (
                        <li key={idx}>
                          {item.quantity}x {item.name} ({item.size}) - Sabores:{' '}
                          {item.flavors.join(', ')}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
