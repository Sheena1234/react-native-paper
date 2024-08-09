import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  TouchableOpacity,
  Animated,
  Text,
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
import DraggableGrid from '../DraggableGrid';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `DataTable`.
   */
  children: React.ReactNode;
  config?: any;
  onDragRelease?: (item: any) => void;
  handleCheckboxPress?: (item: any) => void;
  checkedKeys?: any;
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
const DataTable = ({
  children,
  style,
  config,
  onDragRelease,
  handleCheckboxPress,
  checkedKeys,
  ...rest
}: Props) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const _Data = config?.headers?.map((column: string, index: number) => {
    // You can generate or define keys as needed
    return {
      name: column,
      key: index.toString(),
    };
  });
  const [data, setData] = React.useState<any>(_Data);

  const renderItem = (item: { name: string; key: string }) => {

    return (
      <View
        style={{
          width: 200,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={item.key}
      >
         <Text
        style={{
          fontSize: 14,
          color: 'black',
        }}
      >
        {item.name}
      </Text>
      </View>
    );
  };

  return (
    <View {...rest} style={[styles.container, style]}>
      {config && (
        <TouchableOpacity
          onPress={() => {
            setIsVisible(!isVisible);
          }}
        >
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
      )}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 3 }}>{children}</View>

        {isVisible && (
          <View style={{ marginLeft: 10 }}>
            <DraggableGrid
              data={data}
              renderItem={renderItem}
              onDragRelease={(newData) => {
                setData(newData);
                if (onDragRelease) {
                  const _data = newData.map((column: any) => {
                    // You can generate or define keys as needed
                    return column.name;
                  });
                  onDragRelease(_data);
                }
              }}
              numColumns={1}
              style={{ width: 300 }}
              itemHeight={40}
            />
          </View>
        )}
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
    // width: '100%',
  },
});

export default DataTable;
