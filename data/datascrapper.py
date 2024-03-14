import openpyxl

xl = openpyxl.load_workbook('assignmentgroups.xlsx')

sheet = xl.worksheets[0] 
  
assignment_groups = [] 
  
for i, row in enumerate(sheet): 
    if i == 0: 
        continue
    assignmentgroup = row[2].value 
    if assignmentgroup is not None:
        assignment_groups.append(assignmentgroup) 

hreflist = assignment_groups.copy()

hreflist = [body.replace(" ", "") for body in hreflist]

hreflist = [body.lower() for body in hreflist]

finaloutput = ['<a href="{}" style="display: none;">{}</a>'.format(href, group) for href, group in zip(hreflist, assignment_groups)]

finaloutput.sort()

for body in finaloutput:
    print(body)

print("Formatting complete sending to txt file...")

with open('assignmentgroups.txt', 'w') as f:
    for item in finaloutput:
        f.write("%s\n" % item)

print("File created successfully!")