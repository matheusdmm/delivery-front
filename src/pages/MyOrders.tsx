import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Navbar } from '../components/Navbar';

export default function MyOrders() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-white p-4">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Meus Pedidos</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* pedidos */}
            <div className="p-4 border rounded-lg text-gray-600 text-center">
              Nenhum pedido encontrado.
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
