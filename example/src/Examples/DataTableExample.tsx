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
  name: string;
  calories: number;
  fat: number;
}>;

const DataTableExample = () => {
  const [sortAscending, setSortAscending] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [filteredOption, setFilteredOption] = React.useState('Contain');
  const [originalItems] = React.useState<ItemsState>([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
    },
    {
      key: 6,
      name: 'Jelly Bean',
      calories: 375,
      fat: 0,
    },
  ]);
  const [items, setItems] = React.useState<ItemsState>([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
    },
    {
      key: 6,
      name: 'Jelly Bean',
      calories: 375,
      fat: 0,
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
    'Dessert',
    'Calories per piece',
    'Fat',
  ]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const sortedItems = items
    .slice()
    .sort((item1, item2) =>
      sortAscending
        ? item1.name.localeCompare(item2.name)
        : item2.name.localeCompare(item1.name)
    );
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const likeMatch = (array, key, searchStr) => {
    if (key === 'calories' || key === 'fat') {
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
    if (key === 'calories' || key === 'fat') {
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
    if (key === 'calories' || key === 'fat') {
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
    if (key === 'calories' || key === 'fat') {
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
    if (key == 'calories') {
      return array.filter((item) => {
        return item.calories == searchStr;
      });
    } else if (key == 'fat') {
      return array.filter((item) => {
        return item.fat == searchStr;
      });
    }
    return array.filter((item) => item[key].name.toLowerCase().length === 0);
  };

  const notEmptyMatch = (array, key, searchStr) => {
    if (key == 'calories') {
      return array.filter((item) => {
        console.log(searchStr);
        return item.calories == searchStr;
      });
    } else if (key == 'fat') {
      return array.filter((item) => {
        console.log(searchStr);
        return item.fat == searchStr;
      });
    }
    return array.filter((item) => item[key].name.toLowerCase().length !== 0);
  };

  const startsWithMatch = (array, key, searchStr) => {
    if (key === 'calories' || key === 'fat') {
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
    if (key === 'calories' || key === 'fat') {
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

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      <Card>
        <DataTable
          config={{ headers: headers,  }}
          onDragRelease={(data: any) => {
            setHeaders(data);
          }}
        >
          <DataTable.Header>
            <DataTable.Title
              sortDirection={sortAscending ? 'ascending' : 'descending'}
              onPress={() => {
                setSortAscending(!sortAscending);
              }}
              leftIconConfig={leftIconConfig}
              style={styles.first}
              textStyle={styles.titleStyle}
              onLeftIconPress={() => {}}
            >
              {headers[0]}
            </DataTable.Title>
            <DataTable.Title
              numberOfLines={2}
              onPress={() => {}}
              onLeftIconPress={() => {}}
              style={styles.first}
              textStyle={styles.titleStyle}
              onPressAsc={() => {
                setSortAscending(true);
              }}
              onPressDes={() => {
                setSortAscending(false);
              }}
            >
             {headers[1]}
            </DataTable.Title>
            <DataTable.Title
              onPress={() => {}}
              style={styles.first}
              textStyle={styles.titleStyle}
              onLeftIconPress={() => {}}
            >
              {headers[2]}
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.CellSearch
              style={styles.searchStyle}
              searchFilterData={filterData}
              setFilteredOption={setFilteredOption}
              onChangeText={(text) => {
                if (text.length) {
                  if (filteredOption === 'Contain') {
                    setItems(likeMatch(originalItems, 'name', text));
                  } else if (filteredOption === 'Does not contain') {
                    setItems(unlikeMatch(originalItems, 'name', text));
                  } else if (filteredOption === 'Equals') {
                    setItems(equalMatch(originalItems, 'name', text));
                  } else if (filteredOption === 'Does not equal') {
                    setItems(notEqualMatch(originalItems, 'name', text));
                  } else if (filteredOption === 'Empty') {
                    setItems(emptyMatch(originalItems, 'name', text));
                  } else if (filteredOption === 'Not empty') {
                    setItems(notEmptyMatch(originalItems, 'name', text));
                  } else if (filteredOption === 'Starts with') {
                    setItems(startsWithMatch(originalItems, 'name', text));
                  } else if (filteredOption === 'Ends with') {
                    setItems(endsWithMatch(originalItems, 'name', text));
                  }
                } else {
                  setItems(originalItems);
                }
              }}
              placeholder={'Search ' + headers[0]}
            ></DataTable.CellSearch>
            <DataTable.CellSearch
              style={styles.searchStyle}
              searchFilterData={filterData}
              setFilteredOption={setFilteredOption}
              onChangeText={(text) => {
                if (text.length) {
                  if (filteredOption === 'Contain') {
                    setItems(likeMatch(originalItems, 'calories', text));
                  } else if (filteredOption === 'Does not contain') {
                    setItems(unlikeMatch(originalItems, 'calories', text));
                  } else if (filteredOption === 'Equals') {
                    setItems(equalMatch(originalItems, 'calories', text));
                  } else if (filteredOption === 'Does not equal') {
                    setItems(notEqualMatch(originalItems, 'calories', text));
                  } else if (filteredOption === 'Empty') {
                    setItems(emptyMatch(originalItems, 'calories', text));
                  } else if (filteredOption === 'Not empty') {
                    setItems(notEmptyMatch(originalItems, 'calories', text));
                  } else if (filteredOption === 'Starts with') {
                    setItems(startsWithMatch(originalItems, 'calories', text));
                  } else if (filteredOption === 'Ends with') {
                    setItems(endsWithMatch(originalItems, 'calories', text));
                  }
                } else {
                  setItems(originalItems);
                }
              }}
              placeholder={'Search ' + headers[1]}
            ></DataTable.CellSearch>
            <DataTable.CellSearch
              style={styles.searchStyle}
              searchFilterData={filterData}
              setFilteredOption={setFilteredOption}
              onChangeText={(text) => {
                if (text.length) {
                  if (filteredOption === 'Contain') {
                    setItems(likeMatch(originalItems, 'fat', text));
                  } else if (filteredOption === 'Does not contain') {
                    setItems(unlikeMatch(originalItems, 'fat', text));
                  } else if (filteredOption === 'Equals') {
                    setItems(equalMatch(originalItems, 'fat', text));
                  } else if (filteredOption === 'Does not equal') {
                    setItems(notEqualMatch(originalItems, 'fat', text));
                  } else if (filteredOption === 'Empty') {
                    setItems(emptyMatch(originalItems, 'fat', text));
                  } else if (filteredOption === 'Not empty') {
                    setItems(notEmptyMatch(originalItems, 'fat', text));
                  } else if (filteredOption === 'Starts with') {
                    setItems(startsWithMatch(originalItems, 'fat', text));
                  } else if (filteredOption === 'Ends with') {
                    setItems(endsWithMatch(originalItems, 'fat', text));
                  }
                } else {
                  setItems(originalItems);
                }
              }}
              placeholder={'Search ' + headers[2]}
            ></DataTable.CellSearch>
          </DataTable.Header>

          {sortedItems.slice(from, to).map((item) => (
            <DataTable.Row key={item.key} style={styles.bodyStyle}>
              <DataTable.Cell style={styles.bodyStyleItem}>
                {headers[0] == "Dessert" ? item.name : headers[0] == 'Calories per piece' ? item.calories : headers[0] == "Fat" ? item.fat : ""  }
              </DataTable.Cell>
              <DataTable.Cell style={styles.bodyStyleItem} numeric>
              {headers[1] == "Dessert" ? item.name : headers[1] == 'Calories per piece' ? item.calories : headers[1] == "Fat" ? item.fat : ""  }
              </DataTable.Cell>
              <DataTable.Cell style={styles.bodyStyleItem} numeric>
              {headers[2] == "Dessert" ? item.name : headers[2] == 'Calories per piece' ? item.calories : headers[2] == "Fat" ? item.fat : ""  }
              </DataTable.Cell>
            </DataTable.Row>
          ))}

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
