# VocInsight 筛选器组件化规范

> **Figma 设计源**: `eqZRNIxxbX8axZQthlTAwJ` (VOC_PC端组件)
> **当前版本**: v1.0.0-draft
> **最后更新**: 2026-07-27
> **技术栈**: React 18+ / TypeScript / Tailwind CSS v4

---

## 目录

1. [组件化目标与架构](#1-组件化目标与架构)
2. [设计令牌 Design Tokens](#2-设计令牌-design-tokens)
3. [FilterItem — 筛选条件外层包装器](#3-filteritem--筛选条件外层包装器) `node-id=3320-11160`
4. [Select — 选择器](#4-select--选择器) `node-id=3046-55643`
5. [Input — 输入框](#5-input--输入框) `node-id=3030-54078`
6. [Dropdown — 下拉菜单触发按钮](#6-dropdown--下拉菜单触发按钮) `node-id=3263-32448`
7. [DatePicker — 日期选择器](#7-datepicker--日期选择器) `node-id=187-4087`
8. [InputTag — 标签输入框](#8-inputtag--标签输入框) `node-id=3030-54079`
9. [集成指南](#9-集成指南)

---

## 1. 组件化目标与架构

将 VocInsight BI 后台筛选器区域从单体实现逐步拆分为可复用的独立组件，供前端直接使用。

### 1.1 筛选器整体架构

```
FilterBar（筛选栏容器，待实现）
├── FilterItem × N（筛选条件项）      ← node-id=3320-11160
│   ├── Label（可选标签文字）
│   └── Control（4 种控件类型互斥）
│       ├── Select       选择器       ← node-id=3046-55643
│       ├── Input        输入框       ← node-id=3030-54078
│       ├── DatePicker   日期选择器   ← node-id=187-4087
│       └── InputTag     标签输入框   ← node-id=3030-54079
└── Dropdown Button      下拉菜单按钮 ← node-id=3263-32448
```

### 1.2 组件状态矩阵

所有交互组件统一支持以下状态：

| 状态 | 触发条件 | 视觉表现 |
|---|---|---|
| **默认** | 初始 / 无交互 | 白色背景 + `#E5E6EB` 边框 |
| **悬停** | 鼠标移入 | 边框变为 `#C9CDD4`，过渡 200ms EASE_OUT |
| **聚焦** | 点击 / Tab 聚焦 | 边框 `#00AAA6` + `0 0 0 2px rgba(0,170,166,0.3)` 环 |
| **激活** | 下拉展开中 | 边框 `#00AAA6`，箭头旋转 180° |
| **禁用** | 不可交互 | opacity 30%，cursor not-allowed |
| **错误** | 校验失败 | 边框 `#F53F3F` |

---

## 2. 设计令牌 Design Tokens

### 2.1 颜色

| Token | Hex | Figma Variable ID | 用途 |
|---|---|---|---|
| `--color-primary` | `#00AAA6` | `2326:15986` | 主色调，下拉按钮背景、聚焦边框 |
| `--color-primary-hover` | `#008C89` | — | 主色悬停 |
| `--color-primary-light` | `#22BBB3` | `2326:15989` | 下拉按钮图标区左边框 |
| `--color-focus-ring` | `#6B60EC` | — | 输入框聚焦环 |
| `--color-text-primary` | `#1D2129` | `2326:16031` | 主要文字（已选值、输入内容） |
| `--color-text-placeholder` | `#86909C` | `2326:16038` | 占位符 / 未选择提示 |
| `--color-text-secondary` | `#4E5969` | — | 次要文字 |
| `--color-bg-white` | `#FFFFFF` | `2323:22477` | 组件背景 |
| `--color-bg-filled` | `#F7F8FA` | — | 填充模式背景 |
| `--color-border-default` | `#E5E6EB` | `2326:16010` | 默认边框 |
| `--color-border-hover` | `#C9CDD4` | `2326:16006` | 悬停边框 |
| `--color-error` | `#F53F3F` | — | 错误色 |

### 2.2 字体

| Token | 值 |
|---|---|
| `--font-family` | `"PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |
| `--font-size-base` | `14px` |
| `--font-size-sm` | `12px` |
| `--font-weight-regular` | `400` |
| `--line-height` | `22px`（14px 字体） |

### 2.3 尺寸体系

| 尺寸 | 高度 | 水平 padding | 适用组件 |
|---|---|---|---|
| 迷你 (mini) | `24px` | `8px` | Select, Input, InputTag |
| 小 (small) | `28px` | `8px` | Select, Input, InputTag |
| 中 (medium) | `32px` | `12px` | Select, Input, InputTag, Dropdown, DatePicker |
| 大 (large) | `36px` | `12px` | Select, Input, InputTag |

| 圆角 | 值 | 适用 |
|---|---|---|
| `--radius-sm` | `2px` | Dropdown 按钮 |
| `--radius-md` | `4px` | 其余所有组件 |

---

## 3. FilterItem — 筛选条件外层包装器

> **Figma Node ID**: `3320-11160` | **组件名**: `filter-item` | **类型**: `COMPONENT_SET`

### 3.1 Figma 变体

| 属性 | 可选值 | 默认值 |
|---|---|---|
| `Label下拉` | `true`, `false` | `true` |
| `类型` | `"日期选择器"`, `"输入框"`, `"选择器"`, `"标签输入框"` | `"输入框"` |

### 3.2 结构

```
filter-item
├── Label（文本，14px / #1D2129 / PingFang SC Regular）
└── Control（根据"类型"嵌入对应的子组件实例）
```

### 3.3 视觉规格（默认：输入框变体）

| 属性 | 值 |
|---|---|
| 布局 | HORIZONTAL, counterAxis FIXED |
| 高度 | `32px` |
| 背景 | `#FFFFFF` |
| 边框 | `1px solid #E5E6EB`（上:1, 右:0, 下:1, 左:1） |
| 圆角 | 左侧 `4px`，右侧 `0px` |
| Padding | `3px 12px` |
| 子元素间距 | `4px` |

### 3.4 边框合并规则

多个 FilterItem 水平排列时，通过 border-right: 0 实现无缝衔接：

```
[ item-1 ] [ item-2 ] [ item-3 ]
 rounded-l   无圆角    rounded-r
 右border=0  右border=0  完整border
```

- 首个: `rounded-l-[4px]`, `border-r-0`
- 中间: 无左右圆角, `border-r-0`
- 末尾: `rounded-r-[4px]`, 完整 border
- 独立（只有一个）: `rounded-[4px]`, 完整 border

### 3.5 Props API

```typescript
type FilterControlType = 'select' | 'input' | 'datepicker' | 'inputtag';

interface FilterItemProps {
  label?: string;
  type?: FilterControlType;
  children?: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}
```

### 3.6 React 实现

```tsx
import React, { forwardRef } from 'react';

type FilterControlType = 'select' | 'input' | 'datepicker' | 'inputtag';

export interface FilterItemProps {
  label?: string;
  type?: FilterControlType;
  children?: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

const borderClass = (isFirst: boolean, isLast: boolean): string => {
  if (isFirst && isLast) return 'rounded-[4px] border';
  if (isFirst) return 'rounded-l-[4px] border-t border-b border-l';
  if (isLast) return 'rounded-r-[4px] border';
  return 'border-t border-b border-l';
};

export const FilterItem = forwardRef<HTMLDivElement, FilterItemProps>(
  ({ label, type = 'input', children, isFirst = true, isLast = false, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          inline-flex items-center h-8 bg-white border-[#E5E6EB]
          px-3 py-[3px] gap-1
          ${borderClass(isFirst, isLast)}
          ${className}
        `}
      >
        {label && (
          <span className="text-[14px] leading-[22px] text-[#1D2129] font-normal whitespace-nowrap">
            {label}
          </span>
        )}
        {children}
      </div>
    );
  }
);

FilterItem.displayName = 'FilterItem';
```

---

## 4. Select — 选择器

> **Figma Node ID**: `3046-55643` | **组件名**: `select` | **类型**: `COMPONENT_SET`

### 4.1 Figma 变体

| 属性 | 可选值 | 默认值 |
|---|---|---|
| `尺寸` | `"大"`, `"中"`, `"小"`, `"迷你"` | `"中"` |
| `填充` | `"false"`, `"true"` | `"false"` |
| `多选` | `"false"`, `"true"` | `"false"` |
| `悬停` | `"false"`, `"true"` | `"false"` |
| `聚焦` | `"false"`, `"true"` | `"false"` |
| `禁用` | `"false"`, `"true"` | `"false"` |

### 4.2 结构

```
select
├── body（FILL width）
│   └── title（placeholder "Please select" 或已选值）
└── icon-wrapper
    └── direction/down2（10×10 SVG 箭头）
```

### 4.3 尺寸对照

| 尺寸 | 高度 | Padding | 字号 | 默认宽度 |
|---|---|---|---|---|
| 大 | `36px` | `3px 12px` | `14px` | `220px` |
| 中 | `32px` | `3px 12px` | `14px` | `220px` |
| 小 | `28px` | `2px 8px` | `12px` | HUG |
| 迷你 | `24px` | `1px 8px` | `12px` | HUG |

### 4.4 视觉规格

| 属性 | 默认 | 悬停 | 聚焦/激活 | 禁用 |
|---|---|---|---|---|
| 边框色 | `#E5E6EB` | `#C9CDD4` | `#00AAA6` | `#E5E6EB` |
| 背景 | `#FFF` | `#FFF` | `#FFF` | `#FFF` |
| 文字色 | `#86909C` placeholder / `#1D2129` 已选 | 不变 | 不变 | opacity 30% |
| 箭头 | 0° | 0° | 180° | opacity 30% |
| 外发光 | 无 | 无 | `0 0 0 2px rgba(0,170,166,0.3)` | 无 |

### 4.5 Props API

```typescript
type SelectSize = 'large' | 'medium' | 'small' | 'mini';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  size?: SelectSize;
  filled?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}
```

### 4.6 React 实现

```tsx
import React, { useState, useRef, useEffect } from 'react';

type SelectSize = 'large' | 'medium' | 'small' | 'mini';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  size?: SelectSize;
  filled?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}

const SIZE_CLASSES: Record<SelectSize, string> = {
  large:  'h-9 px-3 py-[3px] text-[14px]',
  medium: 'h-8 px-3 py-[3px] text-[14px]',
  small:  'h-7 px-2 py-[2px] text-[12px]',
  mini:   'h-6 px-2 py-[1px] text-[12px]',
};

export const Select: React.FC<SelectProps> = ({
  size = 'medium',
  filled = false,
  multiple = false,
  disabled = false,
  placeholder = 'Please select',
  options = [],
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayText = (): string => {
    if (!value) return placeholder;
    if (Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      return value.map(v => options.find(o => o.value === v)?.label || v).join(', ');
    }
    return options.find(o => o.value === value)?.label || value;
  };

  const hasValue = value && (Array.isArray(value) ? value.length > 0 : true);
  const showPlaceholder = !hasValue;

  const borderClass = (() => {
    if (disabled) return 'border-[#E5E6EB]';
    if (isOpen) return 'border-[#00AAA6] shadow-[0_0_0_2px_rgba(0,170,166,0.3)]';
    if (focused) return 'border-[#00AAA6]';
    if (hovered) return 'border-[#C9CDD4]';
    return 'border-[#E5E6EB]';
  })();

  return (
    <div
      ref={ref}
      className={`
        relative inline-flex items-center gap-1 border rounded-[4px]
        cursor-pointer select-none transition-all duration-200
        ${SIZE_CLASSES[size]}
        ${filled ? 'bg-[#F7F8FA] border-transparent' : 'bg-white'}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
        ${borderClass}
        ${className}
      `}
      onClick={() => !disabled && setIsOpen(!isOpen)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={isOpen}
    >
      <span className={`flex-1 truncate leading-[22px] ${showPlaceholder ? 'text-[#86909C]' : 'text-[#1D2129]'}`}>
        {displayText()}
      </span>

      <span className={`inline-flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E6EB] rounded-[4px] shadow-lg z-50 max-h-64 overflow-y-auto">
          {options.map(opt => (
            <div
              key={opt.value}
              className={`px-3 py-2 text-[14px] leading-[22px] cursor-pointer hover:bg-[#F7F8FA] transition-colors
                ${opt.disabled ? 'opacity-30 cursor-not-allowed' : ''}
                ${(Array.isArray(value) ? value.includes(opt.value) : value === opt.value) ? 'text-[#00AAA6] bg-[#E5F6F6]' : 'text-[#1D2129]'}
              `}
              onClick={(e) => {
                e.stopPropagation();
                if (opt.disabled) return;
                if (multiple && Array.isArray(value)) {
                  const next = value.includes(opt.value) ? value.filter(v => v !== opt.value) : [...value, opt.value];
                  onChange?.(next);
                } else {
                  onChange?.(opt.value);
                  setIsOpen(false);
                }
              }}
            >
              {multiple && (
                <input type="checkbox" checked={Array.isArray(value) && value.includes(opt.value)} readOnly className="mr-2" />
              )}
              {opt.label}
            </div>
          ))}
          {options.length === 0 && (
            <div className="px-3 py-4 text-center text-[#86909C] text-[14px]">No options</div>
          )}
        </div>
      )}
    </div>
  );
};
```

### 4.7 使用示例

```tsx
// 单选
<Select
  placeholder="请选择渠道"
  options={[{ value: 'app', label: 'App Store' }, { value: 'wechat', label: '微信' }]}
  value={channel}
  onChange={setChannel}
/>

// 多选 + 小尺寸
<Select size="small" multiple placeholder="标签" options={tags} value={selected} onChange={setSelected} />

// 禁用
<Select disabled placeholder="不可选" />

// 填充模式
<Select filled options={opts} />
```

---

## 5. Input — 输入框

> **Figma Node ID**: `3030-54078` | **组件名**: `input` | **类型**: `COMPONENT_SET`

### 5.1 Figma 变体

| 属性 | 可选值 | 默认值 |
|---|---|---|
| `尺寸` | `"大"`, `"中"`, `"小"`, `"迷你"` | `"大"` |
| `状态` | `"默认"`, `"悬停"`, `"聚焦"`, `"禁用"` | `"默认"` |
| `填充` | `"false"`, `"true"` | `"true"` |
| `前缀` | `boolean` | `false` |
| `后缀` | `boolean` | `false` |
| `前置标签` | `boolean` | `false` |
| `后置标签` | `boolean` | `false` |
| `前缀图标` | INSTANCE_SWAP | `3030:40632` |
| `后缀图标` | INSTANCE_SWAP | `3030:40630` |
| `替换文本` | TEXT | `"Voc Design"` |

### 5.2 结构

```
input
├── addBefore（前置标签，可选，如 "http://"）
│   └── wrapper > text
├── wrapper（输入区，FILL width）
│   ├── addBefore（前缀图标，可选，14×14）
│   ├── content-（文本输入区）
│   │   └── placeholder / value text（14px / #1D2129 / PingFang SC）
│   └── addAfter（后缀图标，可选，14×14）
└── addAfter（后置标签，可选，如 ".com"）
```

### 5.3 尺寸对照

| 尺寸 | 高度 | Padding | 字号 |
|---|---|---|---|
| 大 | `36px` | `5px 12px` | `14px` |
| 中 | `32px` | `4px 12px` | `14px` |
| 小 | `28px` | `2px 8px` | `12px` |
| 迷你 | `24px` | `1px 8px` | `12px` |

### 5.4 视觉规格

| 属性 | 默认 | 悬停 | 聚焦 | 禁用 |
|---|---|---|---|---|
| 边框色 | `#E5E6EB` | `#C9CDD4` | `#00AAA6` | `#E5E6EB` |
| 背景 | `#FFF` | `#FFF` | `#FFF` | `#F7F8FA` |
| 文字色 | `#1D2129` | 不变 | 不变 | opacity 30% |
| placeholder 色 | `#86909C` | 不变 | 不变 | opacity 30% |
| 外发光 | 无 | 无 | `0 0 0 2px #6B60EC` (30%) | 无 |

### 5.5 Props API

```typescript
type InputSize = 'large' | 'medium' | 'small' | 'mini';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  size?: InputSize;
  filled?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  addonBefore?: string;
  addonAfter?: string;
  allowClear?: boolean;
  onChange?: (value: string) => void;
}
```

### 5.6 React 实现

```tsx
import React, { useState } from 'react';

type InputSize = 'large' | 'medium' | 'small' | 'mini';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  size?: InputSize;
  filled?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  addonBefore?: string;
  addonAfter?: string;
  allowClear?: boolean;
  onChange?: (value: string) => void;
}

const INPUT_SIZES: Record<InputSize, string> = {
  large:  'h-9 px-3 text-[14px]',
  medium: 'h-8 px-3 text-[14px]',
  small:  'h-7 px-2 text-[12px]',
  mini:   'h-6 px-2 text-[12px]',
};

export const Input: React.FC<InputProps> = ({
  size = 'medium',
  filled = false,
  disabled = false,
  placeholder,
  value: controlledValue,
  defaultValue,
  onChange,
  prefixIcon,
  suffixIcon,
  addonBefore,
  addonAfter,
  allowClear = false,
  maxLength,
  className = '',
  onFocus,
  onBlur,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const displayValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onChange?.('');
  };

  const borderClass = (() => {
    if (disabled) return 'border-[#E5E6EB]';
    if (focused) return 'border-[#00AAA6] shadow-[0_0_0_2px_rgba(107,96,236,0.3)]';
    if (hovered) return 'border-[#C9CDD4]';
    return 'border-[#E5E6EB]';
  })();

  const AddonTag: React.FC<{ children: React.ReactNode; position: 'left' | 'right' }> = ({ children, position }) => (
    <span className={`
      inline-flex items-center px-4 bg-white border-[#E5E6EB]
      ${position === 'left' ? 'rounded-l-[4px] border-t border-b border-l' : 'rounded-r-[4px] border'}
      text-[14px] text-[#1D2129]
    `}>
      {children}
    </span>
  );

  return (
    <div
      className={`inline-flex items-center ${disabled ? 'opacity-30' : ''} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {addonBefore && <AddonTag position="left">{addonBefore}</AddonTag>}

      <div className={`
        relative inline-flex items-center gap-1 bg-white
        border rounded-[4px] transition-all duration-200 flex-1 min-w-0
        ${INPUT_SIZES[size]}
        ${filled ? 'bg-[#F7F8FA] border-transparent' : ''}
        ${borderClass}
        ${addonBefore ? 'rounded-l-none' : ''}
        ${addonAfter ? 'rounded-r-none' : ''}
      `}>
        {prefixIcon && (
          <span className="inline-flex items-center justify-center flex-shrink-0 w-[14px] h-[14px] text-[#86909C]">
            {prefixIcon}
          </span>
        )}

        <input
          {...rest}
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          className={`
            flex-1 min-w-0 outline-none bg-transparent
            text-[#1D2129] placeholder-[#86909C]
            leading-[22px]
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        />

        {allowClear && displayValue && !disabled && (
          <span className="inline-flex items-center justify-center flex-shrink-0 w-[14px] h-[14px] cursor-pointer text-[#86909C] hover:text-[#F53F3F]" onClick={handleClear}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
        )}

        {suffixIcon && (
          <span className="inline-flex items-center justify-center flex-shrink-0 w-[14px] h-[14px] text-[#86909C]">
            {suffixIcon}
          </span>
        )}
      </div>

      {addonAfter && <AddonTag position="right">{addonAfter}</AddonTag>}
    </div>
  );
};
```

### 5.7 使用示例

```tsx
// 基础输入
<Input placeholder="请输入关键词" value={kw} onChange={setKw} />

// 带前缀图标 + 清除
<Input prefixIcon={<SearchIcon />} allowClear />

// 带前置标签
<Input addonBefore="http://" addonAfter=".com" placeholder="example" />

// 禁用小尺寸
<Input size="small" disabled value="不可编辑" />
```

---

## 6. Dropdown — 下拉菜单触发按钮

> **Figma Node ID**: `3263-32448` | **组件名**: `dropdown-trigger` | **类型**: `COMPONENT_SET`

### 6.1 Figma 变体

| 属性 | 可选值 | 默认值 |
|---|---|---|
| `类型` | `"主要"`, `"次要"` | `"主要"` |
| `悬停` | `"false"`, `"true"` | `"false"` |
| `激活` | `"false"`, `"true"` | `"false"` |
| `禁用` | `"false"`, `"true"` | `"false"` |

### 6.2 结构

```
dropdown-trigger（HORIZONTAL, 120×32px FIXED）
├── text（文字区，FILL width/height）
│   └── text/text（如 "渠道"）
├── icon（图标区，32×32px FIXED）
│   ├── 背景 #00AAA6 / #FFF
│   ├── 左边框 1px solid #22BBB3（仅主要类型）
│   ├── 圆角 右侧 2px
│   └── icon-wrapper → direction/down2（14×14 箭头）
```

### 6.3 视觉规格

| 属性 | 主要类型（默认） | 次要类型 |
|---|---|---|
| 背景色 | `#00AAA6` | `#FFFFFF` |
| 文字色 | `#FFFFFF` | `#1D2129` |
| 图标区背景 | `#00AAA6` | `#FFFFFF` |
| 图标区左边框 | `1px solid #22BBB3` | `1px solid #E5E6EB` |
| 文字区圆角 | 左侧 `2px` | 左侧 `2px` |
| 图标区圆角 | 右侧 `2px` | 右侧 `2px` |
| 高度 | `32px` | `32px` |
| 总宽度 | `120px` (FIXED) | `120px` (FIXED) |
| 文字区 padding | `5px 16px` | `5px 16px` |
| 图标 | `direction/down2`, 14×14 | 14×14 |

### 6.4 Props API

```typescript
type DropdownVariant = 'primary' | 'secondary';

interface DropdownTriggerProps {
  variant?: DropdownVariant;
  label?: string;
  disabled?: boolean;
  open?: boolean;
  onClick?: () => void;
  className?: string;
}
```

### 6.5 React 实现

```tsx
import React, { useState } from 'react';

type DropdownVariant = 'primary' | 'secondary';

interface DropdownTriggerProps {
  variant?: DropdownVariant;
  label?: string;
  disabled?: boolean;
  open?: boolean;
  onClick?: () => void;
  className?: string;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  variant = 'primary',
  label = '渠道',
  disabled = false,
  open: controlledOpen,
  onClick,
  className = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const isPrimary = variant === 'primary';

  const handleClick = () => {
    if (disabled) return;
    if (controlledOpen === undefined) setInternalOpen(!internalOpen);
    onClick?.();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        inline-flex items-stretch rounded-[2px] overflow-hidden
        transition-all duration-200
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
        ${isPrimary ? 'bg-[#00AAA6] text-white' : 'bg-white text-[#1D2129] border border-[#E5E6EB]'}
        ${className}
      `}
    >
      <span className={`
        inline-flex items-center px-4 py-[5px] text-[14px] leading-[22px] font-normal
        ${isPrimary ? 'text-white' : 'text-[#1D2129]'}
      `}>
        {label}
      </span>

      <span className={`
        inline-flex items-center justify-center w-8
        ${isPrimary ? 'bg-[#00AAA6] border-l border-[#22BBB3]' : 'bg-white border-l border-[#E5E6EB]'}
      `}>
        <span className={`inline-flex transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </span>
    </button>
  );
};
```

---

## 7. DatePicker — 日期选择器

> **Figma Node ID**: `187-4087` | **组件名**: `datepicker` | **类型**: `COMPONENT_SET`

### 7.1 Figma 变体

| 属性 | 可选值 | 默认值 |
|---|---|---|
| `填充` | `"false"`, `"true"` | `"false"` |
| `范围` | `"true"`, `"false"` | `"true"` |
| `悬停` | `"false"`, `"true"` | `"false"` |
| `激活` | `"false"`, `"true"` | `"false"` |
| `禁用` | `"false"`, `"true"` | `"false"` |
| `时间` | `"true"`, `"false"` | `"true"` |

### 7.2 结构

**范围模式** (范围=true):
```
datepicker（HORIZONTAL, 4px 圆角, 32px 高）
├── input "开始日期"（14px, #86909C → #1D2129）
├── input "-"（分隔符）
├── input "结束日期"
└── suffix（日历图标 14×14）
```

### 7.3 视觉规格

| 属性 | 值 |
|---|---|
| 布局 | HORIZONTAL, counterAxis FIXED |
| 高度 | `32px` |
| 背景 | `#FFFFFF` |
| 边框 | `1px solid #E5E6EB` |
| 圆角 | `4px` |
| 字体 | `PingFang SC Regular` 14px / `Roboto Regular` 14px（分隔符） |
| 行高 | `22px` |

### 7.4 Props API

```typescript
interface DatePickerProps {
  range?: boolean;
  showTime?: boolean;
  filled?: boolean;
  disabled?: boolean;
  placeholder?: string | [string, string];
  value?: Date | [Date, Date] | null;
  onChange?: (value: Date | [Date, Date] | null) => void;
  format?: string;
  className?: string;
}
```

### 7.5 React 实现

```tsx
import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  range?: boolean;
  showTime?: boolean;
  filled?: boolean;
  disabled?: boolean;
  placeholder?: string | [string, string];
  value?: Date | [Date, Date] | null;
  onChange?: (value: Date | [Date, Date] | null) => void;
  format?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  range = true,
  showTime = true,
  filled = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  format = 'YYYY-MM-DD',
  className = '',
}) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const formatDate = (d: Date): string => {
    return d.toISOString().split('T')[0]; // 简化，实际用 date-fns/dayjs
  };

  const borderClass = (() => {
    if (disabled) return 'border-[#E5E6EB]';
    if (isOpen || focused) return 'border-[#00AAA6] shadow-[0_0_0_2px_rgba(0,170,166,0.3)]';
    if (hovered) return 'border-[#C9CDD4]';
    return 'border-[#E5E6EB]';
  })();

  const defaultPlaceholder: [string, string] = ['开始日期', '结束日期'];
  const ph = range
    ? (Array.isArray(placeholder) ? placeholder : defaultPlaceholder)
    : (typeof placeholder === 'string' ? placeholder : '选择日期');

  const renderValue = (): React.ReactNode => {
    if (!value) {
      if (range) {
        return (
          <>
            <span className="text-[#86909C] text-[14px]">{ph[0]}</span>
            <span className="text-[#86909C] text-[14px] mx-[8px]">-</span>
            <span className="text-[#86909C] text-[14px]">{ph[1]}</span>
          </>
        );
      }
      return <span className="text-[#86909C] text-[14px]">{ph as string}</span>;
    }

    if (range && Array.isArray(value)) {
      return (
        <>
          <span className="text-[#1D2129] text-[14px]">{formatDate(value[0])}</span>
          <span className="text-[#86909C] text-[14px] mx-[8px]">-</span>
          <span className="text-[#1D2129] text-[14px]">{formatDate(value[1])}</span>
        </>
      );
    }
    return <span className="text-[#1D2129] text-[14px]">{formatDate(value as Date)}</span>;
  };

  return (
    <div
      ref={ref}
      className={`
        relative inline-flex items-center h-8 bg-white
        border rounded-[4px] px-3 cursor-pointer
        transition-all duration-200 select-none
        ${filled ? 'bg-[#F7F8FA] border-transparent' : ''}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
        ${borderClass}
        ${className}
      `}
      onClick={() => !disabled && setIsOpen(!isOpen)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={disabled ? -1 : 0}
    >
      <div className="flex items-center gap-2">{renderValue()}</div>

      <span className="inline-flex items-center justify-center ml-2 flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M1 5.5H13" stroke="currentColor" strokeWidth="1"/>
          <path d="M4 1V3.5M10 1V3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </span>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E6EB] rounded-[4px] shadow-lg z-50 p-3">
          <div className="text-[14px] text-[#86909C] text-center">日历面板（集成第三方库）</div>
        </div>
      )}
    </div>
  );
};
```

---

## 8. InputTag — 标签输入框

> **Figma Node ID**: `3030-54079` | **组件名**: `inputtag` | **类型**: `COMPONENT_SET`

### 8.1 Figma 变体

| 属性 | 可选值 | 默认值 |
|---|---|---|
| `尺寸` | `"大"`, `"中"`, `"小"`, `"迷你"` | `"中"` |
| `填充` | `"false"`, `"true"` | `"false"` |
| `⬑自定义标签` | `"false"`, `"true"` | `"false"` |
| `悬停` | `"false"`, `"true"` | `"false"` |
| `聚焦` | `"false"`, `"true"` | `"false"` |
| `禁用` | `"false"`, `"true"` | `"false"` |

### 8.2 结构

```
inputtag（VERTICAL 布局 ⚠️ 区别于 Select/Input 的 HORIZONTAL）
└── input-tag-view（HORIZONTAL, FILL width）
    └── title（placeholder "Please input" / Tag × N + 输入光标）
```

### 8.3 尺寸对照

| 尺寸 | 最小高度 | 宽度 | Padding | 字号 |
|---|---|---|---|---|
| 大 | `36px` | `220px` | `5px 12px` | `14px` |
| 中 | `32px` | `220px` | `4px 12px` | `14px` |
| 小 | `28px` | HUG | `2px 8px` | `12px` |
| 迷你 | `24px` | HUG | `1px 8px` | `12px` |

> **关键**: VERTICAL 布局允许标签多行换行，高度自适应（HUG）。

### 8.4 视觉规格

| 属性 | 值 |
|---|---|
| 布局方向 | VERTICAL |
| 背景 | `#FFFFFF` |
| 边框 | `1px solid #C9CDD4`（⚠️ 默认比 Select/Input 深） |
| 圆角 | `4px` |
| placeholder 色 | `#86909C` |

### 8.5 默认标签样式

| 属性 | 值 |
|---|---|
| 背景 | `#E5F6F6` |
| 文字色 | `#00AAA6` |
| 字号 | `12px` |
| 高度 | `22px` |
| 圆角 | `2px` |
| Padding | `2px 6px` |
| 删除按钮 | `×` 图标, 10×10, hover `#F53F3F` |

### 8.6 Props API

```typescript
type InputTagSize = 'large' | 'medium' | 'small' | 'mini';

interface InputTagProps {
  size?: InputTagSize;
  filled?: boolean;
  disabled?: boolean;
  placeholder?: string;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  renderTag?: (tag: string, onRemove: () => void) => React.ReactNode;
  separators?: string[];
  maxTags?: number;
  className?: string;
}
```

### 8.7 React 实现

```tsx
import React, { useState, useRef, KeyboardEvent } from 'react';

type InputTagSize = 'large' | 'medium' | 'small' | 'mini';

interface InputTagProps {
  size?: InputTagSize;
  filled?: boolean;
  disabled?: boolean;
  placeholder?: string;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  renderTag?: (tag: string, onRemove: () => void) => React.ReactNode;
  separators?: string[];
  maxTags?: number;
  className?: string;
}

const TAG_SIZE_CLASSES: Record<InputTagSize, string> = {
  large:  'min-h-9 px-3 py-[5px] text-[14px]',
  medium: 'min-h-8 px-3 py-[4px] text-[14px]',
  small:  'min-h-7 px-2 py-[2px] text-[12px]',
  mini:   'min-h-6 px-2 py-[1px] text-[12px]',
};

export const InputTag: React.FC<InputTagProps> = ({
  size = 'medium',
  filled = false,
  disabled = false,
  placeholder = 'Please input',
  tags = [],
  onTagsChange,
  renderTag,
  separators = [',', '，', 'Enter'],
  maxTags,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemove = (index: number) => {
    const next = tags.filter((_, i) => i !== index);
    onTagsChange?.(next);
  };

  const addTag = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    if (maxTags !== undefined && tags.length >= maxTags) return;
    onTagsChange?.([...tags, trimmed]);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      handleRemove(tags.length - 1);
    } else if (separators.includes(e.key)) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const borderClass = (() => {
    if (disabled) return 'border-[#E5E6EB]';
    if (focused) return 'border-[#00AAA6]';
    if (hovered) return 'border-[#00AAA6]';
    return 'border-[#C9CDD4]'; // ⚠️ default deeper than Select/Input
  })();

  const DefaultTag: React.FC<{ text: string; onRemove: () => void }> = ({ text, onRemove }) => (
    <span className="inline-flex items-center gap-[2px] bg-[#E5F6F6] text-[#00AAA6] text-[12px] leading-[20px] rounded-[2px] px-[6px] py-[2px] whitespace-nowrap">
      {text}
      <span
        className="inline-flex items-center justify-center w-[10px] h-[10px] cursor-pointer hover:text-[#F53F3F]"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
    </span>
  );

  return (
    <div
      className={`
        relative flex flex-wrap items-center gap-[4px] bg-white
        border rounded-[4px] cursor-text transition-all duration-200
        ${TAG_SIZE_CLASSES[size]}
        ${filled ? 'bg-[#F7F8FA] border-transparent' : ''}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
        ${borderClass}
        ${className}
      `}
      onClick={() => inputRef.current?.focus()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tags.map((tag, idx) =>
        renderTag ? (
          <span key={`${tag}-${idx}`}>{renderTag(tag, () => handleRemove(idx))}</span>
        ) : (
          <DefaultTag key={`${tag}-${idx}`} text={tag} onRemove={() => handleRemove(idx)} />
        )
      )}

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={tags.length === 0 ? placeholder : ''}
        disabled={disabled}
        className={`
          flex-1 min-w-[60px] outline-none bg-transparent
          text-[#1D2129] placeholder-[#86909C] leading-[22px]
          ${disabled ? 'cursor-not-allowed' : ''}
        `}
      />
    </div>
  );
};
```

---

## 9. 集成指南

### 9.1 文件结构建议

```
src/
├── components/
│   └── filter/
│       ├── index.ts
│       ├── FilterBar.tsx
│       ├── FilterItem.tsx
│       ├── Select.tsx
│       ├── Input.tsx
│       ├── DropdownTrigger.tsx
│       ├── DatePicker.tsx
│       └── InputTag.tsx
└── styles/
    └── filter-tokens.css
```

### 9.2 设计令牌 CSS

```css
:root {
  --filter-primary: #00AAA6;
  --filter-primary-hover: #008C89;
  --filter-primary-light: #22BBB3;
  --filter-text-primary: #1D2129;
  --filter-text-placeholder: #86909C;
  --filter-text-secondary: #4E5969;
  --filter-border-default: #E5E6EB;
  --filter-border-hover: #C9CDD4;
  --filter-bg-white: #FFFFFF;
  --filter-bg-filled: #F7F8FA;
  --filter-focus-ring: #6B60EC;
  --filter-error: #F53F3F;
  --filter-radius-sm: 2px;
  --filter-radius-md: 4px;
}
```

### 9.3 完整筛选栏示例

```tsx
import { FilterItem, Select, Input, DatePicker, InputTag, DropdownTrigger } from '@/components/filter';

function VocFilterBar() {
  const [channel, setChannel] = useState('');
  const [keyword, setKeyword] = useState('');
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="flex items-center gap-0">
      <DropdownTrigger label="渠道" onClick={togglePanel} />

      <div className="flex items-center">
        <FilterItem label="渠道" type="select">
          <Select placeholder="请选择渠道" options={channelOptions} value={channel} onChange={setChannel} />
        </FilterItem>
        <FilterItem label="关键词" isFirst={false}>
          <Input placeholder="请输入关键词" value={keyword} onChange={setKeyword} allowClear />
        </FilterItem>
        <FilterItem label="日期" isFirst={false} isLast>
          <DatePicker range value={dateRange} onChange={setDateRange} />
        </FilterItem>
      </div>

      <InputTag tags={tags} onTagsChange={setTags} placeholder="添加标签" />
    </div>
  );
}
```

---

## 10. 待完善事项

- [ ] **FilterBar 容器**: 自动管理边框合并、响应式换行
- [ ] **Select 增强**: 搜索过滤、虚拟滚动、键盘导航、无障碍
- [ ] **DatePicker 集成**: 接入 date-fns/dayjs + 第三方日历面板
- [ ] **InputTag 粘贴**: 批量粘贴支持
- [ ] **Dropdown 面板**: 完整下拉菜单面板
- [ ] **单元测试**: Vitest + React Testing Library
- [ ] **Storybook**: 交互式组件文档
- [ ] **响应式**: 小屏幕折叠逻辑

---

> **⚠️ 重要**: 此仓库使用 GitHub Pages 且配置为从根目录 (`/`) 提供服务。**绝对不要**在仓库根目录创建名为 `docs`、`doc` 的目录（会与 GitHub Pages 的 `/docs` 源选项冲突导致页面白屏）。组件规范文档统一放在 `component-specs/` 目录下。
