import Renderer from '@/core/renderer';
import Styles from '@/containers/Styles';
import Map from '@/components/map/Map';
import PopulationLayer from '@/components/map/PopulationLayer';
import mapConfig from '@/config/map.json';

Map(mapConfig, 'map', { PopulationLayer });

Renderer.render(Styles(mapConfig.styles), '#tools');
