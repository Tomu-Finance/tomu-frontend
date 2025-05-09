/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

export type InstitutionProps = {
  name: string;
  code: string;
  type: string;
};

export type FormData = {
  network: string;
  token: string;
  amount: number;
  currency: string;
  institution: string;
  accountIdentifier: string;
  recipientName: string;
  memo: string;
};

export type TransactionPreviewProps = {
  handleBackButtonClick: () => void;
  stateProps: StateProps;
};

export type SelectFieldProps = {
  id: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
  validation: any;
  errors: any;
  register: any;
  isLoading?: boolean;
  value?: string | number | undefined;
  defaultValue?: string;
  title?: string;
};

export type VerifyAccountPayload = {
  institution: string;
  accountIdentifier: string;
};

export type RatePayload = {
  token: string;
  amount?: number;
  currency: string;
};

export type RateResponse = {
  status: string;
  data: number;
  message: string;
};

export type PubkeyResponse = {
  status: string;
  data: string;
  message: string;
};

type OrderStatusData = {
  orderId: string;
  amount: string;
  token: string;
  network: string;
  settlePercent: string;
  status: string;
  txHash: string;
  settlements: Settlement[];
  txReceipts: TxReceipt[];
  updatedAt: string;
};

type Settlement = {
  splitOrderId: string;
  amount: string;
  rate: string;
  orderPercent: string;
};

type TxReceipt = {
  status: string;
  txHash: string;
  timestamp: string;
};

export type OrderStatusResponse = {
  status: string;
  message: string;
  data: OrderStatusData;
};

export type StateProps = {
  formValues: FormData;
  tokenBalance: number;
  smartTokenBalance: number;
  rate: number;
  isFetchingRate: boolean;
  recipientName: string;
  isFetchingRecipientName: boolean;
  institutions: InstitutionProps[];
  isFetchingInstitutions: boolean;
  selectedTab: string;
  handleTabChange: (tab: string) => void;
  selectedNetwork: string;
  handleNetworkChange: (network: string) => void;
  setCreatedAt: (createdAt: string) => void;
  setOrderId: (orderId: string) => void;
  setTransactionStatus: (
    status:
      | "idle"
      | "pending"
      | "processing"
      | "fulfilled"
      | "validated"
      | "settled"
      | "refunded"
  ) => void;
};

export type NetworkButtonProps = {
  network: string;
  logo: string;
  alt: string;
  selectedNetwork: string;
  handleNetworkChange: (network: string) => void;
  disabled?: boolean;
};

export type TabButtonProps = {
  tab: string;
  selectedTab: string;
  handleTabChange: (tab: string) => void;
};

export type AnimatedComponentProps = {
  children: ReactNode;
  variant?: { initial: any; animate: any; exit: any };
  className?: string;
  delay?: number;
};

export type Token = {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
};

export type Config = {
  env: string;
  environment: string;
  mixpanelToken: string;
  hotjarSiteId: number;
  aggregatorUrl: string;
  paymasterApiKey: string;
  paymasterUrl: string;
  bundlerUrl: string;
};

export type Address = `0x${string}`;