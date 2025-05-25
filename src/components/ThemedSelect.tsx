import Color from "@/constants/Color";
import Radius from "@/constants/Radius";
import GlobalStyles from "@/styles/common";
import { scale, verticalScale } from "@/utils/scaleSize";
import { IcArrowDown, IcArrowLeft, IcSearch } from "@assets/icons";
import { FlashList } from "@shopify/flash-list";
import { debounce } from "lodash";
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedBottomSheet from "./ThemedBottomSheet";
import ThemedErrorMessage from "./ThemedErrorMessage";
import ThemedGap from "./ThemedGap";
import ThemedInput from "./ThemedInput";
import ThemedKeyboardAvoiding from "./ThemedKeyboardAvoiding";
import ThemedText from "./ThemedText";

type Option = {
  key: string;
  value: string;
};

interface ThemedSelectProps {
  label?: string;
  icon?: ReactNode;
  value?: string;
  onChangeText?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  data?: Option[];
}

interface ThemedSelectState {
  value: string;
  modalVisible: boolean;
  searchQuery: string;
  filteredData: Option[];
}

export default class ThemedSelect extends React.PureComponent<
  ThemedSelectProps,
  ThemedSelectState
> {
  debouncedSearch: (query: string) => void;

  constructor(props: ThemedSelectProps) {
    super(props);
    this.state = {
      value: props.value ?? "",
      modalVisible: false,
      searchQuery: "",
      filteredData: props.data ?? [],
    };

    this.debouncedSearch = debounce(this.handleDebouncedSearch, 300);
  }

  componentDidUpdate(prevProps: ThemedSelectProps) {
    if (
      this.props.value !== prevProps.value &&
      this.props.value !== this.state.value
    ) {
      this.setState({ value: this.props.value ?? "" });
    }

    if (this.props.data !== prevProps.data) {
      this.setState({ filteredData: this.props.data ?? [] });
    }
  }

  openModal = () => {
    if (!this.props.disabled) {
      this.setState({ modalVisible: true, searchQuery: "" }, () => {
        this.setState({ filteredData: this.props.data ?? [] });
      });
    }
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  selectValue = (value: string) => {
    this.setState({ value, modalVisible: false });
    this.props.onChangeText?.(value);
  };

  handleSearchInput = (query: string) => {
    this.setState({ searchQuery: query });
    this.debouncedSearch(query);
  };

  handleDebouncedSearch = (query: string) => {
    const { data = [] } = this.props;
    const filtered = data.filter((item) =>
      item.key.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredData: filtered });
  };

  getComputedStyles = () => {
    const { error, disabled } = this.props;

    let innerBorderColor = Color.Gray[400];
    let iconColor = Color.Purple[400];
    let textColor = Color.Text.Primary;
    let backgroundColor = Color.Base.White;

    if (disabled) {
      innerBorderColor = Color.Gray[300];
      iconColor = Color.Gray[400];
      textColor = Color.Gray[400];
      backgroundColor = Color.Gray[50];
    } else if (error) {
      innerBorderColor = Color.Red[500];
    }

    return {
      innerBorderColor,
      iconColor,
      textColor,
      backgroundColor,
    };
  };

  render() {
    const { icon, error, disabled, label, data = [] } = this.props;
    const { value, modalVisible, searchQuery, filteredData } = this.state;
    const stylesComputed = this.getComputedStyles();
    const selectedOption = data.find((opt) => opt.value === value);

    return (
      <>
        <View>
          {label && (
            <>
              <ThemedText
                type="Regular"
                size="sm"
                color={Color.Gray[600]}
                style={styles.spacing}
              >
                {label}
              </ThemedText>
              <ThemedGap height="xxs" />
            </>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.openModal}
            disabled={disabled}
          >
            <View style={styles.outerContainer}>
              <View
                style={[
                  styles.container,
                  GlobalStyles.rowCenter,
                  {
                    borderColor: stylesComputed.innerBorderColor,
                    backgroundColor: stylesComputed.backgroundColor,
                  },
                ]}
              >
                {icon && (
                  <>
                    {icon}
                    <ThemedGap width="xs" />
                  </>
                )}
                <View style={[GlobalStyles.flex, { marginLeft: 2 }]}>
                  <ThemedText
                    type="Regular"
                    size="md"
                    color={value ? stylesComputed.textColor : Color.Gray[400]}
                  >
                    {selectedOption?.key ?? label ?? ""}
                  </ThemedText>
                </View>
                <IcArrowDown width={20} height={20} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.spacing}>
            <ThemedErrorMessage message={error} />
          </View>
        </View>

        {/* Modal with search */}
        <ThemedBottomSheet
          type="full"
          visible={modalVisible}
          onClose={this.closeModal}
        >
          <ThemedKeyboardAvoiding>
            <View style={GlobalStyles.rowCenter}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.closeModal}
                style={[styles.backButton, GlobalStyles.center]}
              >
                <IcArrowLeft width={24} height={24} />
              </TouchableOpacity>
              <ThemedGap width="md" />
              <View style={GlobalStyles.flex}>
                <ThemedInput
                  icon={<IcSearch />}
                  placeholder={`Cari ${label}`}
                  value={searchQuery}
                  onChangeText={this.handleSearchInput}
                />
              </View>
            </View>

            <ThemedGap height="xl" />

            <FlashList
              data={filteredData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.value}
                  activeOpacity={0.8}
                  style={styles.optionItem}
                  onPress={() => this.selectValue(item.value)}
                >
                  <ThemedText type="Medium" size="md">
                    {item.value.toUpperCase()}
                  </ThemedText>
                </TouchableOpacity>
              )}
              estimatedItemSize={200}
            />
          </ThemedKeyboardAvoiding>
        </ThemedBottomSheet>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    width: scale(32),
    height: verticalScale(32),
    borderRadius: Radius.rounded,
  },
  outerContainer: {
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: scale(Radius.sm),
  },
  container: {
    maxHeight: verticalScale(44),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    borderWidth: 1.5,
    borderRadius: scale(Radius.xs),
  },
  spacing: {
    marginLeft: scale(4),
  },
  optionItem: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: Color.Gray[300],
  },
});
