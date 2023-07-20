import { ButtonLink } from '../ButtonLink';
import { ScrollableComponent } from '../ScrollableComponent';

export const QuickNav: React.FC = () => {
  const getItems = (): JSX.Element[] => {
    return [
      {
        id: 1,
        label: 'Status/Otimização da Sequência',
      },
      {
        id: 2,
        label: 'Análise Diária de Peças',
      },
      {
        id: 3,
        label: 'Logística',
      },
    ].map((item: any) => {
      return <ButtonLink key={item.id} id={item.id} label={item.label} />;
    });
  };

  return <ScrollableComponent id="quick-nav">{getItems()}</ScrollableComponent>;
};
