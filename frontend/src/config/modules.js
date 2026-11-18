import { People } from '@mui/icons-material';

export const SYSTEM_MODULES = [
  {
    id: 'clientes',
    category: 'Listas',
    label: 'Clientes',
    dashboardTitle: 'Dashboard de Clientes',
    description: 'Visualize, cadastre, edite e gerencie a base de clientes.',
    route: '/clientes',
    endpoint: '/clientes/',
    icon: People,
  },
  // Novos módulos entram aqui no futuro:
  // {
  //   id: 'produtos',
  //   category: 'Listas',
  //   label: 'Produtos',
  //   dashboardTitle: 'Dashboard de Produtos',
  //   description: 'Controle o catálogo, preços e estoque de produtos.',
  //   route: '/produtos',
  //   endpoint: '/produtos/',
  //   icon: Inventory2,
  // },
];