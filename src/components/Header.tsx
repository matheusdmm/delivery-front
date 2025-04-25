import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

export function Header() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Minha Conta</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Meus Pedidos</NavigationMenuLink>
            <NavigationMenuLink>Meus Pedidos</NavigationMenuLink>
            <NavigationMenuLink>Meus Pedidos</NavigationMenuLink>
            <NavigationMenuLink>Configurações</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
