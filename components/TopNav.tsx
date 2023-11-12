import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Icon,
  IconElement,
  MenuItem,
  OverflowMenu,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {useState} from 'react';
const MenuIcon = (props): IconElement => (
  <Icon {...props} name="more-vertical" />
);

const BackIcon = (props): IconElement => <Icon {...props} name="arrow-back" />;

const editIcon = (props): IconElement => <Icon {...props} name="edit" />;

export const TopNavigationTitleShowcase = ({
  navigation,
  isLoading,
}): React.ReactElement => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  //   const route =useState
  //   console.log(route)

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const goBack = () => {
    console.log('gi');
    navigation.navigation.goBack();
  };
  const goToEditLink = () => {
    navigation.navigation.navigate('editLink');
  };
  const BackAction = (): React.ReactElement => (
    <TopNavigationAction icon={BackIcon} onPress={goBack} />
  );

  const renderMenuAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderOverflowMenuAction = (): React.ReactElement => (
    <>
      {isLoading && <Spinner size="small" status="success" />}
      {isLoading}
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem
          accessoryLeft={editIcon}
          title="edit"
          onPress={goToEditLink}
        />
      </OverflowMenu>
    </>
  );

  const renderTitle = (): React.ReactElement => (
    <View style={styles.titleContainer}>
      <Text category="h5">Time Table</Text>
    </View>
  );

  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
      accessoryLeft={
        navigation.route.name !== 'Home' ? BackAction : () => <></>
      }
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
