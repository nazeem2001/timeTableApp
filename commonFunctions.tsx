import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
export class NetworkUtils {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected;
  }
}
export const getLink = (sheet: {
  sheetId: string;
  spreadsheetId: string;
}): string => {
  return `https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}/gviz/tq?tqx=out:json&tq&gid=${sheet.sheetId}`;
};
export const fetchData = async (link: string) => {
  try {
    const res = await fetch(link);
    const resText = await res.text();

    return {
      success: true,
      data: JSON.parse(resText.substring(47).slice(0, -2)),
    };
  } catch {
    return {success: false, resson: 'invalid Link'};
  }
};
function camelCase(str) {
  // Using replace method with regEx
  return str
    .replaceAll('.', ' ')
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
export const formatFetchedData = (data: any) => {
  if (data.success) {
    const colNames: string[] = data.data.table.cols.map(
      (col: {label: string}) => camelCase(col.label),
    );
    const table = data.data.table?.rows?.map((row: {c: any[]}) => {
      let v = {};
      row.c.forEach((val: {v: any; f: any}, i: number) => {
        let value = null;
        if (val) {
          value = val.v;
          if (val.f) {
            value = val.f;
          }
        }
        v = {...v, [colNames[i]]: value};
      });
      return v;
    });
    return {success: true, table};
  }
  return data;
};
export const fetchFormatData = async (sheet: {
  sheetId: string;
  spreadsheetId: string;
}) => {
  let data = await fetchData(getLink(sheet));

  return formatFetchedData(data);
};
export const saveDataLocal = async (data: any) => {
  await AsyncStorage.setItem('data', JSON.stringify(data.table));
  return {success: true};
};
export const getLocalData = () => {
  const data = AsyncStorage.getItem('data');
  return data;
};
export const removeDuplicate = (list: string[]): string[] => {
  return list
    .filter(function (item, pos) {
      return list.indexOf(item) === pos;
    })
    .filter(val => !!val);
};
