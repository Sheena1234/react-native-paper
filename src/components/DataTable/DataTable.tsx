import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  TouchableOpacity,
  Animated,
  Text
} from 'react-native';

import DataTableCell from './DataTableCell';
import DataTableHeader, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DataTableHeader as _DataTableHeader,
} from './DataTableHeader';
import DataTablePagination, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DataTablePagination as _DataTablePagination,
} from './DataTablePagination';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DataTableRow, { DataTableRow as _DataTableRow } from './DataTableRow';
import DataTableTitle, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DataTableTitle as _DataTableTitle,
} from './DataTableTitle';
import DataTableSearchCell from './DataTableSearchCell';
import MaterialCommunityIcon from '../MaterialCommunityIcon';
import { usePopover } from '../ModalPopover/usePopover';
import Popover from '../ModalPopover';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `DataTable`.
   */
  children: React.ReactNode;
  config?: any,
  style?: StyleProp<ViewStyle>;
};

/**
 * Data tables allow displaying sets of data.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DataTable } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [page, setPage] = React.useState<number>(0);
 *   const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
 *   const [itemsPerPage, onItemsPerPageChange] = React.useState(
 *     numberOfItemsPerPageList[0]
 *   );
 *
 *   const [items] = React.useState([
 *    {
 *      key: 1,
 *      name: 'Cupcake',
 *      calories: 356,
 *      fat: 16,
 *    },
 *    {
 *      key: 2,
 *      name: 'Eclair',
 *      calories: 262,
 *      fat: 16,
 *    },
 *    {
 *      key: 3,
 *      name: 'Frozen yogurt',
 *      calories: 159,
 *      fat: 6,
 *    },
 *    {
 *      key: 4,
 *      name: 'Gingerbread',
 *      calories: 305,
 *      fat: 3.7,
 *    },
 *   ]);
 *
 *   const from = page * itemsPerPage;
 *   const to = Math.min((page + 1) * itemsPerPage, items.length);
 *
 *   React.useEffect(() => {
 *     setPage(0);
 *   }, [itemsPerPage]);
 *
 *   return (
 *     <DataTable>
 *       <DataTable.Header>
 *         <DataTable.Title>Dessert</DataTable.Title>
 *         <DataTable.Title numeric>Calories</DataTable.Title>
 *         <DataTable.Title numeric>Fat</DataTable.Title>
 *       </DataTable.Header>
 *
 *       {items.slice(from, to).map((item) => (
 *         <DataTable.Row key={item.key}>
 *           <DataTable.Cell>{item.name}</DataTable.Cell>
 *           <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
 *           <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
 *         </DataTable.Row>
 *       ))}
 *
 *       <DataTable.Pagination
 *         page={page}
 *         numberOfPages={Math.ceil(items.length / itemsPerPage)}
 *         onPageChange={(page) => setPage(page)}
 *         label={`${from + 1}-${to} of ${items.length}`}
 *         numberOfItemsPerPageList={numberOfItemsPerPageList}
 *         numberOfItemsPerPage={itemsPerPage}
 *         onItemsPerPageChange={onItemsPerPageChange}
 *         showFastPaginationControls
 *         selectPageDropdownLabel={'Rows per page'}
 *       />
 *     </DataTable>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DataTable = ({ children, style, config, ...rest }: Props) => {
  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover();
  return (
    <View {...rest} style={[styles.container, style]}>
     { config && <TouchableOpacity ref={touchableRef} onPress={openPopover}>
        <Animated.View
          style={[
            {
              height: 24,
              justifyContent: 'center',
            },
            { alignSelf: 'flex-end' },
          ]}
        >
          <MaterialCommunityIcon
            name="cog-outline"
            size={16}
            color={'grey'}
            direction={'ltr'}
          />
        </Animated.View>
      </TouchableOpacity>
}
      <Popover
        contentStyle={{
          padding: 16,
          //  backgroundColor: 'pink',
          borderRadius: 8,
        }}
        arrowStyle={{
          borderTopColor: 'pink',
        }}
        backgroundStyle={
          {
            // backgroundColor: 'rgba(0, 0, 255, 0.5)',
          }
        }
        visible={popoverVisible}
        onClose={closePopover}
        fromRect={popoverAnchorRect}
        supportedOrientations={['portrait', 'landscape']}
      >

        
      </Popover>
      {children}

      <View style={{flex : 1}}> 
      <Text>Sheena</Text>
      </View>
    </View>
  );
};

// @component ./DataTableHeader.tsx
DataTable.Header = DataTableHeader;

// @component ./DataTableTitle.tsx
DataTable.Title = DataTableTitle;

// @component ./DataTableRow.tsx
DataTable.Row = DataTableRow;

// @component ./DataTableCell.tsx
DataTable.Cell = DataTableCell;

// @component ./DataTablePagination.tsx
DataTable.Pagination = DataTablePagination;

//
DataTable.CellSearch = DataTableSearchCell;
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default DataTable;
