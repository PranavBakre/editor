import { type Provider } from "@lexical/yjs";
import { createContext, type ReactNode, useContext } from "react";
import { Doc } from "yjs";

export interface FeatureContextType {
  collaboration?: {
    id: string;
    providerFactory: (id: string, yjsDocMap: Map<string, Doc>) => Provider;
    active: boolean;
    user: {
      username: string;
      cursorColor: string;
      awareness: Record<string, any>;
    };
  };
}

export type FeatureKey = keyof FeatureContextType;

export const FeatureContext = createContext<FeatureContextType | null>(null);

export const FeatureProvider = ({ children, value }: { children: ReactNode; value: FeatureContextType }) => {
  return <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>;
};

export const useFeature = () => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error("useFeature must be used within a FeatureProvider");
  }
  return context;
};

export const withFeature =
  <K extends FeatureKey>(key: K) =>
  <Props extends Record<string, any>>(
    WrappedComponent: React.ComponentType<
      Props & { feature: NonNullable<FeatureContextType[K]> }
    >
  ) => {
    return function WithFeature(props: Omit<Props, "feature">) {
      const feature = useFeature();
      if (!feature?.[key] || !feature[key].active) {
        return null;
      }
      return <WrappedComponent {...(props as Props)} feature={feature[key]} />;
    };
  };
