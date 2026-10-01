import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import { useSidebarOutsideClick } from './hooks/useSidebarOutsideClick';

import type { ArticleStateType, OptionType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
  articleState,
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);

  const handleToggle = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleApply = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArticleState(formState);
    setIsSidebarOpen(false);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  const handleFieldChange =
    (field: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((state) => ({
        ...state,
        [field]: option,
      }));
    };

  const sidebarRef = useRef<HTMLElement>(null);

  useSidebarOutsideClick({
    isOpen: isSidebarOpen,
    rootRef: sidebarRef,
    onClose: () => setIsSidebarOpen(false),
  });

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={handleToggle} />

      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleFieldChange('fontFamilyOption')}
          />

          <RadioGroup
            title="Размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFieldChange('fontSizeOption')}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleFieldChange('fontColor')}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleFieldChange('backgroundColor')}
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleFieldChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
