// components/FilterDropdown.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface FilterDropdownProps {
  label: string;
  onPress: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 16, color: '#333', fontWeight: '500' }}>
        {label}
      </Text>
      <Icon name="chevron-down" size={20} color="#333" />
    </TouchableOpacity>
  );
};

export default FilterDropdown;
