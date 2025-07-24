import csv
from io import StringIO
from flask import Response

def generate_csv_response(data, headers, filename='data.csv'):
    si = StringIO()
    writer = csv.writer(si)
    writer.writerow(headers)

    for row in data:
        writer.writerow([row.get(h, "") for h in headers])

    output = si.getvalue()
    si.close()

    response = Response(output, mimetype='text/csv')
    response.headers['Content-Disposition'] = f'attachment; filename={filename}'
    return response
