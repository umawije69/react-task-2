import React, {
  FunctionComponent,
  useState,
  ChangeEventHandler,
  useEffect
} from "react";
import {
  Modal,
  Avatar,
  List,
  Checkbox,
  Radio,
  Tag,
  Select,
  Descriptions,
  Card,
  Skeleton
} from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import Search from "antd/lib/input/Search";
import { RadioChangeEvent } from "antd/lib/radio";

import axios from "axios";

export interface ModalProps {
  visible: boolean;
  handleCancel: () => void;
}

interface Customer {
  name: string;
  customerId: string;
  referenceCode: string;
  database: string;
  picture: string;
}

const databases = [
  "Fusion X",
  "Fusion X Pending",
  "Fusion",
  "TestDb1",
  "TestDb2",
  "TestDb3",
  "TestDb4",
  "TestDb5"
];

export const ModalComponent: FunctionComponent<ModalProps> = ({
  visible,
  handleCancel
}) => {
  const [listFilteredByDb, setListFilteredByDb] = useState<Customer[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [customerList, setCustomerList] = useState<Customer[]>();
  const [searchValue, setSearchValue] = useState<string | string[]>("");
  const [searchType, setSearchType] = useState<string>("Name");
  const [selectedDbs, setSelectedDbs] = useState<string[]>([]);
  const [checkBoxOptions, setCheckBoxOptions] = useState<string[]>([
    "Fusion X",
    "Fusion X Pending",
    "Fusion"
  ]);
  const [radioValue, setRadioValue] = useState<string>("set1");

  const [dataFromServer, setDataFromServer] = useState<Customer[]>();

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
      axios
        .get(
          "https://randomuser.me/api/?results=24&inc=name,cell,phone,picture"
        )
        .then(result => {
          if (result.data && result.data.results) {
            let customers: Customer[] = (result.data.results as any[]).map(
              customer => {
                return {
                  name: customer.name.first + " " + customer.name.last,
                  referenceCode: customer.cell,
                  customerId: customer.phone,
                  picture: customer.picture.large,
                  database: databases[Math.floor(Math.random() * (7 - 0 + 1))]
                };
              }
            );

            setDataFromServer(customers);

            setCustomerList(customers);
            setListFilteredByDb(customers);
            setIsLoading(false);
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log(error);
        });
    }
  }, [visible]);

  useEffect(() => {
    if (dataFromServer) {
      if (selectedDbs.length > 0) {
        let filteredList = dataFromServer.filter(item =>
          selectedDbs.includes(item.database)
        );
        setCustomerList(filteredList);
        setListFilteredByDb(filteredList);
      } else {
        setCustomerList(dataFromServer);
        setListFilteredByDb(dataFromServer);
      }
    }
  }, [selectedDbs, dataFromServer]);

  const handleCheckBoxGroup1Change = (values: CheckboxValueType[]) => {
    setSearchValue("");
    setSelectedDbs(prev => {
      let final: string[] = [...prev];
      if (values.length > 0) {
        values.forEach(item => {
          if (!prev.includes(item as string)) {
            final.push(item as string);
          }
          let extra = checkBoxOptions.filter(item => !values.includes(item));
          extra.forEach(item => {
            let result = final.findIndex(itemInFinal => {
              if (itemInFinal === item) {
                return true;
              }
              return false;
            });
            if (result >= 0) {
              final.splice(result, 1);
            }
          });
        });
      } else {
        checkBoxOptions.forEach(item => {
          let result = final.findIndex(itemInFinal => {
            if (itemInFinal === item) {
              return true;
            }
            return false;
          });

          if (result >= 0) {
            final.splice(result, 1);
          }
        });
      }
      return final;
    });
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
    let value = e.target.value;
    setSearchValue(value);
    let filteredResult: Customer[] | undefined;
    if (value.trim().length > 0) {
      switch (searchType) {
        case "Name":
          filteredResult = listFilteredByDb?.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
          );
          setCustomerList(filteredResult);
          break;
        case "CustomerId":
          filteredResult = listFilteredByDb?.filter(item =>
            item.customerId.toLowerCase().includes(value.toLowerCase())
          );
          setCustomerList(filteredResult);
          break;
        case "ReferenceCode":
          filteredResult = listFilteredByDb?.filter(item =>
            item.referenceCode.toLowerCase().includes(value.toLowerCase())
          );
          setCustomerList(filteredResult);
          break;

        default:
          break;
      }
    } else {
      setCustomerList(listFilteredByDb);
    }
  };

  const handleRadioClick = (e: RadioChangeEvent) => {
    let value: string = e.target.value;
    setRadioValue(value);
    if (value === "set1") {
      setCheckBoxOptions(["Fusion X", "Fusion X Pending", "Fusion"]);
    } else if (value === "set2") {
      setCheckBoxOptions(["TestDb1", "TestDb2", "TestDb3"]);
    } else if (value === "set3") {
      setCheckBoxOptions(["TestDb4", "TestDb5"]);
    }
  };

  const handleSelectChange = (value: string) => {
    setSearchType(value);
  };

  const selectAfter = (
    <Select
      value={searchType}
      onChange={handleSelectChange}
      className="w-64"
      size="large"
    >
      <Select.Option value="Name">Name</Select.Option>
      <Select.Option value="CustomerId">CustomerId</Select.Option>
      <Select.Option value="ReferenceCode">ReferenceCode</Select.Option>
    </Select>
  );

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      closable={true}
      bodyStyle={{ padding: 0 }}
      width="80%"
    >
      <div className="p-8 pt-12">
        <Search
          placeholder="Search"
          size="large"
          value={searchValue}
          onChange={handleSearchChange}
          addonAfter={selectAfter}
        />
        <div className="my-4">
          <Radio.Group
            buttonStyle="solid"
            className="mr-32"
            onChange={handleRadioClick}
            value={radioValue}
          >
            <Radio.Button value="set1">Set 1</Radio.Button>
            <Radio.Button value="set2">Set 2</Radio.Button>
            <Radio.Button value="set3">Set 3</Radio.Button>
          </Radio.Group>

          <Checkbox.Group
            options={checkBoxOptions}
            onChange={handleCheckBoxGroup1Change}
          />
        </div>
        <div className="my-8">
          {selectedDbs.map(item => (
            <Tag className="mr-4" key={item} color="geekblue">
              {item}
            </Tag>
          ))}
        </div>

        <div className="mb-0">
          <Tag color="volcano">Total 24 items</Tag>
        </div>

        <div className="p-4">
          <Skeleton loading={isLoading} active avatar>
            <List
              itemLayout="horizontal"
              dataSource={customerList}
              loading={isLoading}
              pagination={{
                pageSize: 2
              }}
              renderItem={item => (
                <List.Item className="mb-8">
                  <List.Item.Meta
                    avatar={
                      <Card
                        className="w-32 h-40"
                        size="small"
                        title={item.name}
                        cover={
                          <img
                            className="w-32 h-32"
                            alt="user"
                            src={item.picture}
                          />
                        }
                      />
                    }
                    description={
                      <Descriptions bordered layout="vertical">
                        <Descriptions.Item label="Customer Id">
                          {item.customerId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Person Reference Code">
                          {item.referenceCode}
                        </Descriptions.Item>
                        <Descriptions.Item label="Database">
                          <Tag color="geekblue">{item.database}</Tag>
                        </Descriptions.Item>
                      </Descriptions>
                    }
                  />
                </List.Item>
              )}
            />
          </Skeleton>
        </div>
      </div>
    </Modal>
  );
};
