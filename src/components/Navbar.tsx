import { useAuth } from '../hooks/useAuth';
import { supabase } from '../../supabase.config';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Minha Conta</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => navigate('/orders')}
            >
              Novo Pedido
            </NavigationMenuLink>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => navigate('/myorders')}
            >
              Meus Pedidos
            </NavigationMenuLink>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={handleLogout}
            >
              Logout
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
