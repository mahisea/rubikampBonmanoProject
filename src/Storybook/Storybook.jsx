import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import Button from "../components/Button/Button"

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
]

const typeOptions = [
  { label: 'Primary', value: 'primary' },
  { label: 'Error', value: 'error' },
  { label: 'Gray', value: 'gray' },
]

const variantOptions = [
  { label: 'Fill', value: 'fill' },
  { label: 'Outline', value: 'outline' },
]

const StoryBookButton = () => {
    return (
        <table style={{padding: 4, borderSpacing: 12, border: "1px solid grey", margin: "1rem"}}>
          <thead>
            <tr>
              <th colSpan='4' style={{textAlign: "center"}}>Button Props</th>
            </tr>
            <tr>
              <th>Size</th>
              <th>Type</th>
              <th colSpan="2">Variant</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th style={{fontWeight: 'normal'}}>Fill</th>
              <th style={{fontWeight: 'normal'}}>Outline</th>
            </tr>
          </thead>
          <tbody>
            {sizeOptions.map(sizeOption => (
              typeOptions.map(typeOption => (
                <tr key={`${sizeOption.value}-${typeOption.value}`}>
                  <td>{sizeOption.label}</td>
                  <td>{typeOption.label}</td>
                  {variantOptions.map(variantOption => (
                    <td key={`${sizeOption.value}-${typeOption.value}-${variantOption.value}`}>
                      <Button 
                        type={typeOption.value} 
                        variant={variantOption.value} 
                        size={sizeOption.value}
                      >
                        عنوان
                      </Button>
                    </td>
                  ))}
                </tr>
              ))
            ))}
          </tbody>
        </table>
    )
}

const StoryBook = () => {
  const [variant, setVariant] = useState('fill');
  const [size, setSize] = useState('small');
  const [type, setType] = useState('primary');
    return (
        <div>
            <div>
              <a href="https://storybook.js.org/" target="_blank">Storybook</a> یک ابزار متن‌باز برای توسعه، تست و مستندسازی کامپوننت‌های رابط کاربری (UI) به‌صورت ایزوله است. این ابزار به توسعه‌دهندگان و طراحان کمک می‌کند تا بدون نیاز به اجرای کل برنامه، کامپوننت‌ها را در محیطی مستقل مشاهده و ویرایش کنند. Storybook از فریمورک‌هایی مانند React، Vue، Angular و Svelte پشتیبانی می‌کند. همچنین قابلیت‌هایی مانند افزودن Addonها، تست بصری و مستندسازی خودکار را فراهم می‌کند.
              <div>ما در اینجا یک محیطی شبیه به استوری بوک پیاده سازی کردیم تا بتوانید کامپوننت‌هایی که در دیزاین سیستم طراحی کردیم را به صورت ایزوله مشاهده و تست کنیم.</div>
            </div>
            <h2>کار با کامپوننت‌</h2>
            <div style={{margin: '4px 0'}}>Button Props</div>
            <div style={{display: "flex", gap: 12}}>
              <FormControl variant="outlined">
                <InputLabel id="size-select-label">Size</InputLabel>
                <Select
                  labelId="size-select-label"
                  id="size-select"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  label="Size"
                >
                  {sizeOptions.map(sizeOption => (
                    <MenuItem key={sizeOption.value} value={sizeOption.value}>{sizeOption.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                >
                  {typeOptions.map(typeOption => (
                    <MenuItem key={typeOption.value} value={typeOption.value}>{typeOption.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel id="variant-select-label">Variant</InputLabel>
                <Select
                  labelId="variant-select-label"
                  id="variant-select"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  label="Variant"
                >
                  {variantOptions.map(variantOption => (
                    <MenuItem key={variantOption.value} value={variantOption.value}>{variantOption.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{marginTop: 12}}>
              <Button size={size} type={type} variant={variant}>عنوان</Button>
            </div>

            <h2>پیش نمایش کلی</h2>
            <StoryBookButton />
        </div>
    )
}

export default StoryBook