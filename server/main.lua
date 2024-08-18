lib.callback.register('nf-spawn:server:getOwnedProperties', function(source)
    local _source = source

    if not _source then
        return
    end

    local properties = {}

    local response = MySQL.query.await('SELECT * FROM properties WHERE owner = ?', {
        exports.qbx_core:GetPlayer(_source).PlayerData.citizenid
    })

    if response then
        for i = 1, #response, 1 do
            local coords = json.decode(response[i].coords)

            table.insert(properties, {
                id = response[i].id,
                interior = response[i].interior,
                label = response[i].property_name,
                description = 'You own this property.',
                enter = vec3(coords.x, coords.y, coords.z)
            })
        end
    end

    return properties
end)

---1011.0776, -1761.8571, 6.8905, 134.0261
