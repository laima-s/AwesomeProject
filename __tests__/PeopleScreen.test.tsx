import React from 'react';
import { render } from '@testing-library/react-native';
import PeopleScreen from '../app/components/PeopleScreen';
import DataScreen from '../app/screen/DataScreen';

jest.mock('../app/screen/DataScreen', () => jest.fn());

describe('PeopleScreen', () => {
    it('renders correctly', () => {
        (DataScreen as jest.Mock).mockReturnValue(null);
        const { toJSON } = render(<PeopleScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('passes the correct props to DataScreen', () => {
        render(<PeopleScreen />);
        expect(DataScreen).toHaveBeenCalledWith(
            expect.objectContaining({
                endpoint: 'people',
                renderItem: expect.any(Function),
                backgroundImage: expect.any(Number),
            }),
            {}
        );
    });

    it('renderItem renders a person correctly', () => {
        const person = { name: 'Luke Skywalker', height: '172', mass: '77' };
        const { getByText } = render(
            <PeopleScreen />
        );

        const renderItem = (DataScreen as jest.Mock).mock.calls[0][0].renderItem;
        const { getByText: getByTextInRenderItem } = render(renderItem({ item: person }));

        expect(getByTextInRenderItem('Luke Skywalker')).toBeTruthy();
        expect(getByTextInRenderItem('Height: 172')).toBeTruthy();
        expect(getByTextInRenderItem('Mass: 77')).toBeTruthy();
    });
});