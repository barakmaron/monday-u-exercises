import renderer from 'react-test-renderer';
import Statistics from '../Statistics';

it('Render snapshot of StatisticsPage', () => {
    const tree = renderer.create(<Statistics></Statistics>).toJSON();
    expect(tree).toMatchSnapshot();
});