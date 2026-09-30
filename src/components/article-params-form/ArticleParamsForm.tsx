import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

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
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);

  const handleToggle = (): void => {
    setIsOpen((isOpen) => {
      const nextIsOpen = !isOpen;

      if (nextIsOpen) {
        setFormState(articleState);
      }

      return nextIsOpen;
    });
  };

  const handleApply = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArticleState(formState);
    setIsOpen(false);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  const handleFontFamilyChange = (option: OptionType): void => {
    setFormState((state) => ({
      ...state,
      fontFamilyOption: option,
    }));
  };

  const handleFontSizeChange = (option: OptionType): void => {
    setFormState((state) => ({
      ...state,
      fontSizeOption: option,
    }));
  };

  const handleFontColorChange = (option: OptionType): void => {
    setFormState((state) => ({
      ...state,
      fontColor: option,
    }));
  };

  const handleBackgroundColorChange = (option: OptionType): void => {
    setFormState((state) => ({
      ...state,
      backgroundColor: option,
    }));
  };

  const handleContentWidthChange = (option: OptionType): void => {
    setFormState((state) => ({
      ...state,
      contentWidth: option,
    }));
  };

  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        formRef.current &&
        event.target instanceof Node &&
        !formRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />

      <aside
        ref={formRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
          <Text size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleFontFamilyChange}
          />

          <RadioGroup
            title="Размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFontSizeChange}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleFontColorChange}
          />

          <Separator />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleBackgroundColorChange}
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleContentWidthChange}
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
