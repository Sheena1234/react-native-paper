import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { DataTable, Card } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';

type ItemsState = Array<{
  key: number;
  Dessert: string;
  Calories: number;
  Fat: number;
}>;

const DataTableExample = () => {
  const [sortAscending, setSortAscending] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [filteredOption, setFilteredOption] = React.useState('Contain');
  const [originalItems] = React.useState<ItemsState>([
    {
      key: 1,
      Dessert: 'Cupcake',
      Calories: 356,
      Fat: 16,
    },
    {
      key: 2,
      Dessert: 'Eclair',
      Calories: 262,
      Fat: 16,
    },
    {
      key: 3,
      Dessert: 'Frozen yogurt',
      Calories: 159,
      Fat: 6,
    },
    {
      key: 4,
      Dessert: 'Gingerbread',
      Calories: 305,
      Fat: 3.7,
    },
    {
      key: 5,
      Dessert: 'Ice cream sandwich',
      Calories: 237,
      Fat: 9,
    },
    {
      key: 6,
      Dessert: 'Jelly Bean',
      Calories: 375,
      Fat: 0,
    },
  ]);
  const [items, setItems] = React.useState<ItemsState>([
    {
      key: 1,
      Dessert: 'Cupcake',
      Calories: 356,
      Fat: 16,
    },
    {
      key: 2,
      Dessert: 'Eclair',
      Calories: 262,
      Fat: 16,
    },
    {
      key: 3,
      Dessert: 'Frozen yogurt',
      Calories: 159,
      Fat: 6,
    },
    {
      key: 4,
      Dessert: 'Gingerbread',
      Calories: 305,
      Fat: 3.7,
    },
    {
      key: 5,
      Dessert: 'Ice cream sandwich',
      Calories: 237,
      Fat: 9,
    },
    {
      key: 6,
      Dessert: 'Jelly Bean',
      Calories: 375,
      Fat: 0,
    },
  ]);

  const leftIconConfig = [
    {
      id: 1,
      title: 'Sort Ascending',
      onPress: () => {
        setSortAscending(true);
      },
      leadingIcon: 'arrow-up',
      disabled: sortAscending ? true : false,
    },
    {
      id: 1,
      title: 'Sort Descending',
      onPress: () => {
        setSortAscending(false);
      },
      leadingIcon: 'arrow-down',
      disabled: !sortAscending ? true : false,
    },
  ];
  const [numberOfItemsPerPageList] = React.useState([10, 200]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [headers, setHeaders] = React.useState([
    { name: 'Dessert', key: 'Dessert', leftIconConfig : [
      {
        id: 1,
        title: 'Sort Ascending',
        onPress: () => {
          setSortAscending(true);
        },
        leadingIcon: 'arrow-up',
        disabled: sortAscending ? true : false,
      },
      {
        id: 1,
        title: 'Sort Descending',
        onPress: () => {
          setSortAscending(false);
        },
        leadingIcon: 'arrow-down',
        disabled: !sortAscending ? true : false,
      },
    ] },
    { name: 'Calories', key: 'Calories', leftIconConfig : [
      {
        id: 1,
        title: 'Sort Ascending',
        onPress: () => {
          setSortAscending(true);
        },
        leadingIcon: 'arrow-up',
        disabled: sortAscending ? true : false,
      },
      {
        id: 1,
        title: 'Sort Descending',
        onPress: () => {
          setSortAscending(false);
        },
        leadingIcon: 'arrow-down',
        disabled: !sortAscending ? true : false,
      },
    ] },
    { name: 'Fat' , key : "Fat", leftIconConfig : [
      {
        id: 1,
        title: 'Sort Ascending',
        onPress: () => {
          setSortAscending(true);
        },
        leadingIcon: 'arrow-up',
        disabled: sortAscending ? true : false,
      },
      {
        id: 1,
        title: 'Sort Descending',
        onPress: () => {
          setSortAscending(false);
        },
        leadingIcon: 'arrow-down',
        disabled: !sortAscending ? true : false,
      },
    ]},
  ]);

  const sortedItems = items
    .slice()
    .sort((item1, item2) =>
      sortAscending
        ? item1.Dessert.localeCompare(item2.Dessert)
        : item2.Dessert.localeCompare(item1.Dessert)
    );
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const likeMatch = (array, key, searchStr) => {
    if (key === 'Calories' || key === 'Fat') {
      return array.filter((item) => {
        const itemValue = item[key].toString();
        const searchValue = searchStr.toString();
        return itemValue.includes(searchValue);
      });
    }
    return array.filter((item) =>
      item[key].toLowerCase().includes(searchStr.toLowerCase())
    );
  };

  const unlikeMatch = (array, key, searchStr) => {
    if (key === 'Calories' || key === 'Fat') {
      return array.filter((item) => {
        const itemValue = item[key].toString();
        const searchValue = searchStr.toString();
        return !itemValue.includes(searchValue);
      });
    }
    return array.filter(
      (item) => !item[key].toLowerCase().includes(searchStr.toLowerCase())
    );
  };

  const equalMatch = (array, key, searchStr) => {
    if (key === 'Calories' || key === 'Fat') {
      return array.filter((item) => {
        const itemValue = item[key].toString();
        const searchValue = searchStr.toString();
        return itemValue === searchValue;
      });
    }
    return array.filter(
      (item) => item[key].toLowerCase() === searchStr.toLowerCase()
    );
  };

  const notEqualMatch = (array, key, searchStr) => {
    if (key === 'Calories' || key === 'Fat') {
      return array.filter((item) => {
        const itemValue = item[key].toString();
        const searchValue = searchStr.toString();
        return itemValue !== searchValue;
      });
    }
    return array.filter(
      (item) => item[key].toLowerCase() !== searchStr.toLowerCase()
    );
  };

  const emptyMatch = (array, key, searchStr) => {
    if (key === 'Calories') {
      return array.filter((item) => {
        return item.Calories == searchStr;
      });
    } else if (key == 'Fat') {
      return array.filter((item) => {
        return item.Fat == searchStr;
      });
    }
    return array.filter((item) => item[key].name.toLowerCase().length === 0);
  };

  const notEmptyMatch = (array, key, searchStr) => {
    if (key === 'Calories') {
      return array.filter((item) => {
        console.log(searchStr);
        return item.Calories == searchStr;
      });
    } else if (key == 'Fat') {
      return array.filter((item) => {
        console.log(searchStr);
        return item.Fat == searchStr;
      });
    }
    return array.filter((item) => item[key].name.toLowerCase().length !== 0);
  };

  const startsWithMatch = (array, key, searchStr) => {
    if (key === 'Calories' || key === 'Fat') {
      return array.filter((item) => {
        const itemValue = item[key].toString();
        const searchValue = searchStr.toString();
        return itemValue.startsWith(searchValue);
      });
    }
    return array.filter((item) =>
      item[key].toLowerCase().startsWith(searchStr.toLowerCase())
    );
  };

  const endsWithMatch = (array, key, searchStr) => {
    if (key === 'Calories' || key === 'Fat') {
      return array.filter((item) => {
        const itemValue = item[key].toString();
        const searchValue = searchStr.toString();
        return itemValue.endsWith(searchValue);
      });
    }
    return array.filter((item) =>
      item[key].toLowerCase().endsWith(searchStr.toLowerCase())
    );
  };

  const filterData = [
    { id: 1, name: 'Contain' },
    { id: 2, name: 'Does not contain' },
    { id: 3, name: 'Equals' },
    { id: 4, name: 'Does not equal' },
    // { id: 5, name: 'Empty' },
    // { id: 6, name: 'Not empty' },
    { id: 7, name: 'Starts with' },
    { id: 8, name: 'Ends with' },
  ];

  const handleCheckboxPress = (item) => {
    setHeaders((prevSelected) => {
      // If the item is already selected, remove it
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selectedItem) => selectedItem !== item);
      }
      // Otherwise, add it to the selected items
      return [...prevSelected, item];
    });
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      <Card>
        <DataTable
          config={{ headers: headers, data: items }}
          onDragRelease={(data: any) => {
            setHeaders(data);
          }}
          handleCheckboxPress={handleCheckboxPress}
          checkedKeys={headers}
        >
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${sortedItems.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      </Card>
    </ScreenWrapper>
  );
};

DataTableExample.title = 'Data Table';

const styles = StyleSheet.create({
  content: {
    padding: 8,
  },
  first: {
    flex: 2,
    borderColor: 'grey',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 5,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bodyStyle: {},
  bodyStyleItem: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 5,
  },
  searchStyle: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '30%',
    top: 55,
  },
  centeredView: {
    flex: 1,
    marginTop: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default DataTableExample;
