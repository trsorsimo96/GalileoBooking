package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.Town;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Town entity.
 */
public interface TownSearchRepository extends ElasticsearchRepository<Town, Long> {
}
