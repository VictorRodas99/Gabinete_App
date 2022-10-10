from xlsxwriter import Workbook

def create_excel_file(path:str, headers:list, items:list[dict]) -> None:
    with Workbook(path) as excel:
        sheet = excel.add_worksheet()
        
        for col, header in enumerate(headers):
            sheet.write(0, col, header)

        for row, product in enumerate(items):
            for col, value in enumerate( list(product.values()) ):
                sheet.write(row + 1, col, value)